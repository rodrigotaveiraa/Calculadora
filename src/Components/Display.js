import React from 'react'
import { 
    View, 
    Text,
    StyleSheet
 } from 'react-native'


const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#808080',
        alignItems: 'flex-end'
    },
    displayValue: {
        fontSize: 90,
        color: '#fff',

    }
})

export default props => {
    return (
        <View style={styles.display}>
            <Text 
            style={styles.displayValue} numberOfLines={1}
            >{props.value}</Text>
        </View>
    )
}