import { useEffect, useState } from "react";

import Loading from "../../../components/common/Loading/Loading";
import Button from "../../../components/common/Button/Button";

import studentService from "../../../services/studentService";

export default function Profile(){

    const [loading,setLoading]=useState(true);

    const [student,setStudent]=useState(null);

    useEffect(()=>{

        loadProfile();

    },[]);

    async function loadProfile(){

        try{

            setLoading(true);

            const data=await studentService.myProfile();

            setStudent(data);

        }finally{

            setLoading(false);

        }

    }

    if(loading){

        return <Loading/>;

    }

    if (!student) {

    return <Loading />;

    }

    return(

        <>

            <div className="dashboard-header">

                <h1>

                    Meu Perfil

                </h1>

                <p>

                    Consulte os seus dados pessoais.

                </p>

            </div>

            <div className="settings-container">

                <div className="settings-card">

                    <div
                        style={{
                            display:"flex",
                            alignItems:"center",
                            gap:"20px",
                            marginBottom:"30px"
                        }}
                    >

                        <div
                            style={{
                                width:"90px",
                                height:"90px",
                                borderRadius:"50%",
                                background:"#2563eb",
                                color:"#fff",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                fontSize:"32px",
                                fontWeight:"700"
                            }}
                        >

                            {student.user.name.charAt(0)}

                        </div>

                        <div>

                            <h2>

                                {student.user.name}

                            </h2>

                            <p>

                                Nº Estudante: {student.student_number}

                            </p>

                        </div>

                    </div>

                    <table
                        style={{
                            width:"100%"
                        }}
                    >

                        <tbody>

                            <tr>

                                <td><strong>Email</strong></td>

                                <td>{student.user.email}</td>

                            </tr>

                            <tr>

                                <td><strong>Telefone</strong></td>

                                <td>{student.user.phone || "-"}</td>

                            </tr>

                            <tr>

                                <td><strong>Faculdade</strong></td>

                                <td>{student.faculty?.name}</td>

                            </tr>

                            <tr>

                                <td><strong>Departamento</strong></td>

                                <td>{student.department?.name}</td>

                            </tr>

                            <tr>

                                <td><strong>Curso</strong></td>

                                <td>{student.course?.name}</td>

                            </tr>

                            <tr>

                                <td><strong>Estado</strong></td>

                                <td>

                                    {

                                        student.user.active

                                        ?

                                        "Activo"

                                        :

                                        "Inactivo"

                                    }

                                </td>

                            </tr>

                            <tr>

                                <td><strong>Registado em</strong></td>

                                <td>

                                    {

                                        new Date(

                                            student.user.created_at

                                        ).toLocaleDateString("pt-PT")

                                    }

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

                <div className="settings-footer">

                    <Button>

                        Editar Perfil

                    </Button>

                </div>

            </div>

        </>

    );

}