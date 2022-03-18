import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { FilteringTable } from "./FiltertingTable";
import swal from 'sweetalert';
import { EditUser } from "./EditUser";

function Main() {


    const [loadingData, setLoadingData] = useState(true);
    const [show, setShow] = useState(false);
    const [cell, setCell] = useState(null)


    const checkModal = (props) => {
        setShow(props.show)
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
            Header: "Name",
            accessor: "Name",
        },
        {
            Header: "Email",
            accessor: "Email",
        },
        {
            Header: "Number",
            accessor: "Number",
        },
        {
            Header: "DOB",
            accessor: "DOB",

        }, {
            width: 700,
            Header: "Action",
            Cell: ({ cell }) => (
                <div className="d-flex justify-content-around" >
                    <div >
                        <button className="btn btn-primary p-2" onClick={() => {
                            setShow(true)
                            setCell(cell)
                        }}>
                            Edit
                        </button>
                    </div >

                    <button className="btn btn-danger" onClick={() => {
                        deleteRowConfirmation(cell)
                    }}>
                        Delete
                    </button>
                </div>

            )
        }
    ]);

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            await axios
                .get("http://localhost:5000/api/v1/posts/all/")
                .then((response) => {
                    // check if the data is populated
                    console.log(response.data);
                    setData(response.data);
                    // you tell it that you had the result
                    setLoadingData(false);
                });
        }
        if (loadingData) {
            // if the result is not ready so you make the axios call
            getData();
        }
    }, [loadingData]);

    return (
        <div className="container">
            {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
            {loadingData ? (
                <p>Loading Please wait...</p>
            ) : (
                <FilteringTable columns={columns} data={data} defaultSorted={[
                    {
                        id: Number,
                        desc: true
                    }
                ]} />
            )}
            {show ? (<EditUser cell={cell} checkModal={checkModal} />) : (<></>)}
        </div>
    );
}

export default Main;