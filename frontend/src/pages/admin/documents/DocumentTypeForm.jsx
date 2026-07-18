import { useEffect, useState } from "react";

import Modal from "../../../components/common/Modal/Modal";
import Input from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";
import Select from "../../../components/common/Select/Select";
import TextArea from "../../../components/common/TextArea/TextArea";

export default function DocumentTypeForm({

    open,
    onClose,
    onSubmit,
    document = null,
    loading = false

}) {

    const [form, setForm] = useState({

        name: "",
        code: "",
        description: "",
        price: "",
        processing_days: "",
        active: true

    });

    useEffect(() => {

        if (document) {

            setForm({

                name: document.name || "",

                code: document.code || "",

                description: document.description || "",

                price: document.price || "",

                processing_days: document.processing_days || "",

                active: document.active

            });

        } else {

            setForm({

                name: "",

                code: "",

                description: "",

                price: "",

                processing_days: "",

                active: true

            });

        }

    }, [document]);

    function handleChange(e) {

        const { name, value } = e.target;

        setForm({

            ...form,

            [name]:

                name === "active"

                    ? value === "true"

                    : value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(form);

    }

    return (

        <Modal

            open={open}

            onClose={onClose}

            title={

                document

                    ? "Editar Tipo de Documento"

                    : "Novo Tipo de Documento"

            }

            footer={

                <>

                    <Button

                        variant="secondary"

                        onClick={onClose}

                    >

                        Cancelar

                    </Button>

                    <Button

                        onClick={handleSubmit}

                    >

                        {

                            loading

                                ? "Guardar..."

                                : "Guardar"

                        }

                    </Button>

                </>

            }

        >

            <form>

                <Input

                    label="Nome"

                    name="name"

                    value={form.name}

                    onChange={handleChange}

                    required

                />

                <Input

                    label="Código"

                    name="code"

                    value={form.code}

                    onChange={handleChange}

                    required

                />

                <Input

                    label="Preço (Kz)"

                    type="number"

                    name="price"

                    value={form.price}

                    onChange={handleChange}

                    required

                />

                <Input

                    label="Dias para emissão"

                    type="number"

                    name="processing_days"

                    value={form.processing_days}

                    onChange={handleChange}

                    required

                />

                <TextArea

                    label="Descrição"

                    name="description"

                    value={form.description}

                    onChange={handleChange}

                />

                <Select

                    label="Estado"

                    name="active"

                    value={String(form.active)}

                    onChange={handleChange}

                    options={[

                        {

                            value: "true",

                            label: "Activo"

                        },

                        {

                            value: "false",

                            label: "Inactivo"

                        }

                    ]}

                    required

                />

            </form>

        </Modal>

    );

}