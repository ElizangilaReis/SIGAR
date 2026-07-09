import "./Select.css";

export default function Select({

    label,

    value,

    onChange,

    name,

    options=[],

    required=false

}){

    return(

        <div className="select-group">

            {label &&

                <label>

                    {label}

                </label>

            }

            <select

                name={name}

                value={value}

                onChange={onChange}

                required={required}

            >

                <option value="">

                    Selecione...

                </option>

                {

                    options.map(option=>(

                        <option

                            key={option.value}

                            value={option.value}

                        >

                            {option.label}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}