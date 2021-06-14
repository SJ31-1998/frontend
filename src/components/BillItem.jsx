import React from 'react'

export default function BillItem(props) {
    const { item } = props;

    return (
        <>
            <tr>
                <td>{item.name}</td>
                <td>{item.height}</td>
                <td>{item.mass}</td>
                <td>{item.hair_color}</td>
                <td>{item.skin_color}</td>
                <td>{item.birth_year}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.gender}</td>
                <td>{item.homeworld}</td>
            </tr>
        </>
                )
                }
