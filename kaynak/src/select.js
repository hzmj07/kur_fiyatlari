
import React,{useEffect , useState } from 'react';
import {Text, View,StyleSheet,Pressable} from 'react-native';
import {Header} from './Header';
import {heading} from './Typography';
import Button from '../../App';



const Select = () => {

const  [ userData, setUserData ] = useState([]);
const [atama , setAtama] = useState ();


//console.log(atama)


function verialma() { 
    fetch('https://hasanadiguzel.com.tr/api/kurgetir')
    .then(response => response.json())
    .then(data => setUserData(data.TCMB_AnlikKurBilgileri))
    .catch(error => console.error('Error fetching data: ', error))};

 
    
 
useEffect(() => {
    verialma();
  } );

       //console.log(userData)
  let kod = []; 
  let fyt = [];    
      function veriekleme() {   
          userData.forEach(function(item){
          let isim1 = item.CurrencyName
          let fiyat = item.ForexBuying

         kod.push(isim1); 
          fyt.push(fiyat);
      
            
        });};

      
      

      if (typeof userData == 'object' ) {
        veriekleme();
      } else {
        verialma();
      };

 

     
      return(
        <View>

       
        {kod.map((value,index)=>  {
            return (  
            <View
             key={index}
             style={[{
              alignItems:'center',
              justifyContent:'center',

             }]}
            >
            <Pressable
            onPress={()=> setAtama(index)}
            
           
            style={  ({pressed}) => [ {}, styles.cont]} >


                <Text  
                style={styles.text}
                > {kod[index]} </Text>

            </Pressable>
          
            
     
            </View>);            
        })}

        </View>
);

};
 
export default Select


const styles = StyleSheet.create({
    cont:{
        flex:1,
        borderWidth:2,
        alignItems:'center',
        justifyContent:'center',
        margin:3,
        backgroundColor:'#ffff',
        width:'60%',
        borderRadius:23
        
    },
    text:{
       
 
        
        height:30,
        textAlign:'center',
        fontSize:14,
        fontWeight:'bold',
        
    }




});
