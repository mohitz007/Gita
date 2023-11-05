

import React,{useState} from "react";
import { Text, View,ScrollView, TouchableOpacity} from "react-native";
import { CheckBox } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { setTranslation } from "../redux/gita_action_reducer";

const SettingsScreen = ({navigation}) => {



    const dispatch = useDispatch();

    const {htrskd,
        httyn,
        htshg,
        scsh,
        hcchi,
        hcrskd,
        scang,
        scram,
        scanand,
        scjaya,
        scmad,
        scval,
        scms,
        scsri,
        scvv,
        scpur,
        scneel,
        scdhan,
        ecsiva,
        etsiva,
        etpurohit,
        etgb,
        setgb,
        etssa,
        etassa,
        etradi,
        etadi} =  useSelector(state => state.gita_action_reducer)

        // console.log(htrskd,htrskd.value);
        
        const [checked, setChecked] = useState([
            {title: "Hindi Translation By Swami Ramsukhdas", value: Boolean(htrskd.value) ,name: "htrskd" },
            {title: "Hindi Translation By Swami Tejomayananda", value: Boolean(httyn.value) ,name: "httyn" },
            {title: "Hindi Translation Of Sri Shankaracharya's Sanskrit Commentary By Sri Harikrishnadas Goenka", value: Boolean(htshg.value) ,name: "htshg" },
            {title: "Sanskrit Commentary By Sri Shankaracharya", value: Boolean(scsh.value) ,name: "scsh"},
            {title: "Hindi Commentary By Swami Chinmayananda", value: Boolean(hcchi.value) ,name: "hcchi" },
            {title: "Hindi Commentary By Swami Ramsukhdas", value: Boolean(hcrskd.value) ,name: "hcrskd"},
            {title: "Sanskrit Commentary By Sri Abhinavgupta", value: Boolean(scang.value),name: "scang"},
            {title: "Sanskrit Commentary By Sri Ramanuja", value: Boolean(scram.value),name: "scram"},
            {title: "Sanskrit Commentary By Sri Anandgiri", value: Boolean(scanand.value),name: "scanand"},
            {title: "Sanskrit Commentary By Sri Jayatritha", value: Boolean(scjaya.value),name: "scjaya"},
            {title: "Sanskrit Commentary By Sri Madhavacharya", value: Boolean(scmad.value),name: "scmad"},
            {title: "Sanskrit Commentary By Sri Vallabhacharya", value: Boolean(scval.value),name: "scval" },
            {title: "Sanskrit Commentary By Sri Madhusudan Saraswati", value: Boolean(scms.value),name: "scms"},
            {title: "Sanskrit Commentary By Sri Sridhara Swami", value: Boolean(scsri.value),name: "scsri"},
            {title: "Sanskrit Commentary By Sri Vedantadeshikacharya Venkatanatha", value: Boolean(scvv.value),name: "scvv"},
            {title: "Sanskrit Commentary By Sri Purushottamji", value: Boolean(scpur.value), name: "scpur"},
            {title: "Sanskrit Commentary By Sri Neelkanth", value: Boolean(scneel.value), name: "scneel"},
            {title: "Sanskrit Commentary By Sri Dhanpati", value: Boolean(scdhan.value), name: "scdhan"},
            {title: "English Commentary By Swami Sivananda", value: Boolean(ecsiva.value), name: "ecsiva"},
            {title: "English Translation By Swami Sivananda", value: Boolean(etsiva.value), name: "etsiva"},
            {title: "English Translation by Shri Purohit Swami", value: Boolean(etpurohit.value), name: "etpurohit"},
            {title: "English Translation By Swami Gambirananda", value: Boolean(etgb.value), name: "etgb" },
            {title: "English Translation Of Sri Shankaracharya's Sanskrit Commentary By Swami Gambirananda", value: Boolean(setgb.value), name: "setgb" },
            {title: "English Translation By By Dr. S. Sankaranarayan", value: Boolean(etssa.value), name: "etssa" },
            {title: "English Translation of Abhinavgupta's Sanskrit Commentary By Dr. S. Sankaranarayan", value: Boolean(etassa.value), name: "etassa" },
            {title: "English Translation of Ramanuja's Sanskrit Commentary By Swami Adidevananda", value: Boolean(etradi.value), name: "etradi" },
            {title: "EEnglish Translation By Swami Adidevananda", value: Boolean(etadi.value), name: "etadi" },


        ]);


        const handleCheckboxToggle = (index) => {
            const newCheckedItems = [...checked];
            newCheckedItems[index].value = !newCheckedItems[index].value;
            setChecked(newCheckedItems);
          };

        const handleSubmit = () => {
            dispatch(setTranslation(checked));
        };

    return (
        <ScrollView>
            
            {checked.map((item,index) => (

                <CheckBox
                key={index}
                title={item.title}
                checked={item.value}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={'checkbox-blank-outline'}
                onPress={() => handleCheckboxToggle(index)}
            />
            ))}
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Done</Text>
            </TouchableOpacity>
        </ScrollView>
    )
};


export default SettingsScreen;