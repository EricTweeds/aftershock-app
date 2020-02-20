import { AsyncStorage } from "react-native";

module.exports.retrieveItem =  async function(key) {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);
        return retrievedItem;
    } catch(e) {
        console.log("Retrieve Error: " + e);
    }
    return;
}

module.exports.setItem = async function(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log("Storage Error: " + e);
    }
    return;
}

module.exports.removeItem = async function(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log("Removing Error: " + e);
    }
    return;
}