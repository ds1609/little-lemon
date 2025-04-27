import { Text, View, Image, TextInput, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { createTable, getMenuItems, saveMenuItems, filterByQueryAndCategories } from "../database";
import Filters from "./components/filters";
import Banner from "./components/banner";
import { getSectionListData, useUpdateEffect }  from "../utils";
import debounce from "lodash/debounce";
import { homeStyles } from "../styles/home.styles";

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [menus, setMenus] = useState(Object);
  const [sections, setSections] = useState(Object);
  const [filterSelections, setFilterSelections] = useState<boolean[]>([]);
  
  useEffect(() => {
    (async () => {
      try {
        // create table
        await createTable();

        // get menu items
        let menuItems = await getMenuItems();
        if(menuItems?.length == 0){
          const menuItems = await fetchData();
          saveMenuItems(menuItems);
        }

        setMenus(menuItems);

        // Get Sections Categories
        const sectionListData = getSectionListData(menuItems);
        setSections(sectionListData);

        setFilterSelections(sectionListData.map(() => false));

      } catch (error) {
        console.log("useEffect Error",error);
      }
    })();
  }, []);

  const fetchData = async() => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      const menuData = json.menu;
      return menuData;
    } catch (error) {
      console.log("fetchData Error",error);
    }
  }

  useUpdateEffect(() => {
    (async () => {
      const activeCategory = sections.filter((s,i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      })
      
      try {
        const menuItems = await filterByQueryAndCategories(query,activeCategory);
        setMenus(menuItems);
      } catch (error) {
        console.log("",error);
      }
      
    })();
  },[filterSelections,query]);

  const handleFiltersChange = async (index:number) => {
    let arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  }

  const lookup = useCallback((q:any) => {
    setQuery(q);
  }, []);
  const debouncedLookUp = useMemo(() => debounce(lookup, 500),[lookup]);

  const handleSearchBar = (text:string) => {
    setSearchText(text);
    debouncedLookUp(text);
  }

  const renderItem = ({ item }) => {
    let photoUrl = `https://github.com/ds1609/little-lemon/blob/development/assets/images/${item.image}?raw=true`;
    
    return (
      <View style={homeStyles.sectionMenus}>
        <Text style={homeStyles.menuTitle}>{item.name}</Text>
        <View style={{flexDirection:"row"}}>
          <View style={{width:"70%"}}>
            <Text style={homeStyles.menuDescription}>{item.description}</Text>
            <Text style={homeStyles.menuPrice}>{"$"}{item.price}</Text>
          </View>
          <View style={homeStyles.sectionMenuImage}>
            <Image source={{uri:photoUrl}} style={homeStyles.menuImage} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={homeStyles.container}>
      <View style={homeStyles.sectionBanner}>
        <Banner />

        <View style={homeStyles.sectionBannerSearch}>
          <Ionicons name="search" style={homeStyles.iconSearch} />
          <TextInput style={[homeStyles.styleInput,{flex:1}]} placeholder="search here..." placeholderTextColor={"#333333"} value={searchText} onChangeText={handleSearchBar} />
        </View>
        
      </View>

      <View style={homeStyles.sectionFilters}>
        <Text style={homeStyles.sectionFiltersTitle}>Order for Delivery</Text>
        
        {Object.keys(sections).length > 0 ? (
          <Filters sections={sections} onChange={handleFiltersChange} selections={filterSelections} />
        ) : null }
      </View>

      <FlashList
        data={menus}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{fontFamily:"Karla-Regular",fontSize:20,fontWeight:"bold",margin:25}}>No Data</Text>}
        estimatedItemSize={200}
      />

    </ScrollView>
  );
}


