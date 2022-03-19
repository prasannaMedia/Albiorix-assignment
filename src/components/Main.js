import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { FilteringTable } from "./FiltertingTable";
import swal from 'sweetalert';
import { EditUser } from "./EditUser";
import { Button } from '@material-ui/core'
import Loader from './486.gif'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';










function Main() {

    const [loadingData, setLoadingData] = useState(true);
    const [show, setShow] = useState(false);
    const [cell, setCell] = useState(null)
    const [onEdit, setOnEdit] = useState(false)

    const checkModal = (props) => {
        setShow(props)
        setCell(null)
    }
    const deleteRowConfirmation = (row) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteUser(row);
            } else {
                swal("Not deleted!");
            }
        });
    };

    const deleteUser = async (user) => {
        const usermail = user.row.original.Email
        await axios.delete(`http://localhost:5000/api/v1/posts/${usermail}`).then((response) => {
            setLoadingData(!loadingData)
            swal("Deleted", "Your data deleted from Database", "success");
            // window.location.reload(false);

        }).catch((error) => {
            console.log(error)
        })
    }

    const columns = useMemo(() => [
        {
            Header: "NAME",
            accessor: "Name",
        },
        {
            Header: "EMAIL",
            accessor: "Email",
        },
        {
            Header: "NUMBER",
            accessor: "Number",
        },
        {
            Header: "DOB",
            accessor: "DOB",


        }, {
            width: 700,
            Header: "ACTION",
            Cell: ({ cell }) => (
                <div className="d-flex justify-content-around" >
                    <div >
                        <Button className="p-2" variant="contained" color="primary" onClick={() => {
                            setShow(true)
                            setCell(cell)
                        }}>
                            <EditIcon />
                            EDIT
                        </Button>
                    </div >

                    <Button variant="contained" color="secondary" onClick={() => {
                        deleteRowConfirmation(cell)
                    }}>
                        <DeleteIcon />
                        Delete
                    </Button>
                </div>

            )
        }
    ],);

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            await axios
                .get("http://localhost:5000/api/v1/posts/all/")
                .then((response) => {
                    console.log(response.data);
                    setData(response.data);
                    setLoadingData(false);
                });
        }
        if (loadingData) {
            getData();
        }
        setOnEdit(false)
    }, [loadingData, show, cell, onEdit]);

    return (
        <div className="container">
            {loadingData ? (
                <div className="d-flex justify-content-center"><img src={Loader} alt="loading" ></img>  </div>
            ) : (
                <FilteringTable columns={columns} data={data} defaultSorted={[
                    {
                        id: Number,
                        desc: true
                    }
                ]} />
            )}
            {show ? (<EditUser cell={cell} checkModal={checkModal} setOnEdit={setOnEdit} />) : (<></>)}
        </div>
    );
}

export default Main;