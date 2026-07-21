<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Models\Setting;

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
}