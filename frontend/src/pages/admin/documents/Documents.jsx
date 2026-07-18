import { useState } from "react";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import Button from "../../../components/common/Button/Button";

import DocumentTypes from "./DocumentTypes";
import DocumentRequests from "./DocumentRequests";

export default function Documents() {

    const [tab, setTab] = useState("types");

    return (

        <>

            <PageHeader

                title="Documentos"

                subtitle="Gestão dos documentos académicos."

            />

            <div className="tabs">

                <Button

                    variant={

                        tab === "types"

                            ? "primary"

                            : "secondary"

                    }

                    onClick={() => setTab("types")}

                >

                    Tipos de Documentos

                </Button>

                <Button

                    variant={

                        tab === "requests"

                            ? "primary"

                            : "secondary"

                    }

                    onClick={() => setTab("requests")}

                >

                    Pedidos de Documentos

                </Button>

            </div>

            {

                tab === "types"

                    ? <DocumentTypes />

                    : <DocumentRequests />

            }

        </>

    );

}