<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::first();

        if (!$setting) {

            $setting = Setting::create([

                'institution_name' => 'SIGAR',

                'email' => 'geral@sigar.ao',

                'phone' => '',

                'address' => '',

                'academic_year' => date('Y'),

                'language' => 'pt',

                'timezone' => 'Africa/Luanda',

                'currency' => 'AOA',

                'maintenance' => false,

                'registration' => true,

                'notifications' => true

            ]);

        }

        return response()->json([

            'success'=>true,

            'data'=>new SettingResource($setting)

        ]);
    }

    public function update(UpdateSettingRequest $request)
    {
        $setting = Setting::first();

        if(!$setting){

            $setting = new Setting();

        }

        $setting->fill(

            $request->validated()

        );

        $setting->save();

        return response()->json([

            'success'=>true,

            'message'=>'Configurações actualizadas com sucesso.',

            'data'=>new SettingResource($setting)

        ]);
    }

    public function uploadLogo(Request $request)
{
    $request->validate([

        'logo'=>'required|image|max:2048'

    ]);

    $setting = Setting::first();

    if(!$setting){

        $setting = Setting::create([

            'institution_name'=>'SIGAR',

            'email'=>'',

            'language'=>'pt',

            'timezone'=>'Africa/Luanda',

            'currency'=>'AOA'

        ]);

    }

    if($setting->logo){

        Storage::disk('public')->delete($setting->logo);

    }

    $path = $request
        ->file('logo')
        ->store('logos','public');

    $setting->logo = $path;

    $setting->save();

    return response()->json([

        'success'=>true,

        'message'=>'Logótipo actualizado.',

        'logo'=>asset('storage/'.$path)

    ]);
}

public function backup()
{
    $database = env('DB_DATABASE');
    $username = env('DB_USERNAME');
    $password = env('DB_PASSWORD');
    $host = env('DB_HOST');

    $filename = 'backup_' . now()->format('Y_m_d_H_i_s') . '.sql';

    $path = storage_path($filename);

    $command = sprintf(
        'mysqldump -h%s -u%s %s %s > %s',
        $host,
        $username,
        $password ? '-p'.$password : '',
        $database,
        $path
    );

    exec($command);

    return response()->download($path)->deleteFileAfterSend(true);
}
}