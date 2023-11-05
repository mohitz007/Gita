import React, { useState,useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import cheerio from "cheerio";
import { instance } from "../configs/axiosConfig";


const SlokBox = ({language,fcv,fnv}) => {
    const [Slok, setSlok] = useState("")

    console.log(language,fcv,fnv);

    const parameters = {
        language : language,
        field_chapter_value : fcv,
        field_nsutra_value : fnv,
    }

    const fetch_slok = async () => {
        console.log("fetch");
        instance.get('/srimad',{
            params : parameters,
        })
            .then((response) => {
                const html = response.data;
                const $ = cheerio.load(html);

                const elements = $('.views-field.views-field-body');

                elements.each((index, element) => {
                    const text = $(element).text();
                    setSlok(text)
                });
            })
            .catch((error) => {
                console.error(`Error fetching URL: ${error}`);
                setSlok("Network Error please try later")
            });
    }


    useEffect(() => {
        fetch_slok();
    }, [fcv,fnv])
    

    

    return (
            <Text>{Slok}</Text>
    )



};


export default SlokBox;