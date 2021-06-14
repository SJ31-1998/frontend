import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import BillItem from './BillItem';
import '../App.css'

export default function Demo1() {
    const [items, setItems] = useState([]);
    const [searchedText, setSearchedText] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get("https://swapi.dev/api/people/");

                // data = await axios.get("https://swapi.dev/api/people/")
                console.log(response);
                setItems(response.data.results);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();

    }, [])

    return (
        <div className="container">

            <input type="text"
                className="form-control"
                placeholder="search item here"
                id="txtSearchBox"
                value={searchedText}
                style={{backgroundColor:"khaki"}}
                onChange={e=>setSearchedText(e.target.value)}></input><br/>
            <table className="table table-hover table-bordered table-responsive">

                <thead>
                    <tr style={{backgroundColor:"burlywood"}}>
                        <th>name</th>
                        <th>height</th>
                        <th>mass</th>
                        <th>hair_color</th>
                        <th>skin_color</th>
                        <th>birth_year</th>
                        <th>created</th>
                        <th>edited</th>
                        <th>gender</th>
                        <th>homeworld</th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor:"azure",borderRadius:1+"rem"}}>
                    {
                        items.map(item => {
                            if (searchedText !==  "") {
                                if (item.name.indexOf(searchedText) === -1) {
                                    return null;
                                }
                                else {
                                    return <BillItem item={item}></BillItem>
                                }
                            }
                            else {
                                return <BillItem item={item}></BillItem>
                            }


                        })
                    }
                </tbody>
            </table>


        </div>
    )
}
