import React,{useEffect , useState } from 'react';
import { Text, View, StyleSheet ,Pressable, Image, ScrollView, SafeAreaView,RefreshControl, TextInput, TurboModuleRegistry } from 'react-native';
import axios from 'axios';
import Select from './kaynak/src/select';

const Button = () => {
  const  [ userData, setUserData ] = useState([]);
  const  [ veri , setVeri] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isselect, setselect] = React.useState(false);

  const [number, setNumber] = useState(0);
  const [deger , setDeger] = useState(1);

  const handleInputChange = (text) => {
    // Girilen değeri kontrol ediyoruz, boş veya 0 ise 1 olarak değiştiriyoruz.
    const newValue = text.trim() === '' || parseFloat(text) === 0 ? 1: text;
    setNumber(newValue);
  };

  const handleButtonPress = () => {
   const intager = parseInt(number);
    setDeger(intager);
    
    // Bu kısımda number state'ini kullanabilirsiniz.
   // console.log('Number:', number);
  };

  // if (number === '' || number === 0) {
  //   setdeger(1);
  // } else{
  //   setdeger(number)
  // }
  



  // const fetchData = () => {
  //   // API'den veri almak için fetch, axios veya diğer HTTP kütüphanelerini kullanabilirsiniz.
  // fetch('https://hasanadiguzel.com.tr/api/kurgetir')
  // .then(response => response.json())
  // .then(data => setUserData(data.TCMB_AnlikKurBilgileri))
  // .catch(error => console.error('Error fetching data: ', error))
  // .finally(() => setRefreshing(false));
  // };


function verialma() {
  fetch('https://hasanadiguzel.com.tr/api/kurgetir')
  .then(response => response.json())
  .then(data => setUserData(data.TCMB_AnlikKurBilgileri))
  .catch(error => console.error('Error fetching data: ', error))
  .finally(() => setRefreshing(false));

};




useEffect(() => {
  verialma();
  
} );

 


let ad = [];
let alisf = [];
let satıs = [];







const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  verialma();

  setTimeout(() => {
    setRefreshing(false);
  }, 200);
}, [])







function veriekleme() {
  userData.forEach(function(item){
    let isim1 = item.Isim
    let alıs1 = item.ForexBuying
    let satıs1 = item.ForexSelling

   ad.push(isim1); 
//          console.log(ad);
   alisf.push(alıs1); 
   satıs.push(satıs1);

      
  });

};
// gelenveride herhangi bir aksaklık olunca uygualama çöker if ile hal et
     //     console.log(typeof userData);


          if (typeof userData == 'object' ) {
            veriekleme();
          } else {
            verialma();
          };
          
        return(
          <SafeAreaView
          style={styles.con}  
          >
            <View style={styles.bass} >
            
          
          
            <Image
        style={styles.tinyLogo}
        source={require('./kaynak/pngwing.com.png')}
      />

            


            </View>   

      <ScrollView style={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
              
                <Text style={styles.baslik3}>Currencies to TRY </Text>
              
                <TextInput
               
               onChangeText={handleInputChange}
            //   value={number}
               keyboardType="numeric"
                style={styles.input}
                ></TextInput>


                  <Pressable 
                   
                    onPress={handleButtonPress}

                style={[{
                  borderWidth:2,
                  width:'12%',
                  margin:2,
                  borderRadius:40,
                  height:50,
                  position:'absolute',
                  marginVertical:10,
                  left:360,
                  backgroundColor:'white',
                  alignItems:'center',
                  justifyContent:'center'
                  }]}
                >
                  <Text
                  style={[{fontSize:16 , fontWeight:'bold'}]}
                  >OK</Text>
                </Pressable>

   
                {
                  ad.map((value,index)=>  {

                    return(
                      <View
                      key={index}
                    //  onPress={onPress}
                      style={ 
                   [ styles.view]}>

                        <View 
                         style={
                          styles.v1}
                         >
                          <Text style={styles.text1}
                          key={index}
                          > {ad[index] } </Text>
                          </View>


                     <View
                         style={styles.v2}                      
                      >
                          <Text 
                          style={styles.text1}
                          key={index}
                          > {alisf[index] * deger } </Text>
                          
                          </View>


                          <View
                         style={styles.v3}                      
                      >
                          <Text 
                          style={styles.text1}
                          key={index}
                          > {satıs[index] * deger } </Text>
                          
                          </View>                          
                      


                      </View>
                      
                    );
                  })
                }
                
                </ScrollView>
                
           
           </SafeAreaView>

          
        );
        
          
    
}


export default Button



const styles = StyleSheet.create({
  v1:{
    width:'100%',
    borderBlockColor:'white',
    position:'absolute',
    fontSize:50,
    top:8
    


    
  },

  v2:{
    width:'100%',
    borderBlockColor:'white',
    top:8,
    left:300,
    fontSize:90
    
  },
  v3:{
    width:'100%',
    borderBlockColor:'white',
    top:8,
    left:200,
    fontSize:90,
    position:'absolute',
  },




  con:{
    
    flex:4,
    borderWidth:0,
    alignContent:'center',
    justifyContent:'center',
    width:'100%',
      
    },

    tinyLogo:{
      width: 150,
      height: 150,
    },

  text1: {
    fontWeight:'bold',
    marginHorizontal: 20,


  },
 bass:{
  alignItems:'center',
  justifyContent:'center',
  flex:0.4
 },


  view:{
    height:40,
    backgroundColor:'white',
    width:'99%',
    borderWidth:2,
    borderRadius:40,
    margin:3,
    
  },

  baslik3:{
    fontSize:30,   
    borderWidth:0,
    borderRadius:40,
    margin:19,
    fontWeight:'900',
    position:'absolute'
 
  },

  baslik2:{
    fontSize:30,   
    alignItems:'center',
    justifyContent:'center',
    borderWidth:0,
    borderRadius:40,
    margin:19,
    fontWeight:'900',
    left:20,
    position:'absolute',
  },

  baslik:{
    fontSize:30,   
    alignItems:'center',
    justifyContent:'center',
    borderWidth:0,
    borderRadius:40,
    margin:19,
    fontWeight:'900',
    position:'absolute',
    left:200
    
  },
  scroll:{
  

      flex:4,
      width:'100%',
      borderRadius:10,
      backgroundColor:'lightblue',      
      borderWidth:2
  },

input:{
  
borderWidth:2,
width:'26%',
margin:2,
borderRadius:40,
height:50,
fontWeight:'bold',
marginVertical:10,
textAlign:'center',
fontSize:19,
left:248,

//position:'absolute',

},
buton:{
  alignItems:'center',
  justifyContent:'center',
  borderRadius:40,
  borderWidth:2,
 // position:'absolute',
  width:70,
  height:50,

},







})
