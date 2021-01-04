import React, { Component } from 'react'
import { View , Text, StyleSheet} from 'react-native'
import Botao from './src/Components/Botao'
import Display from './src/Components/Display'

const initialState = {
  displayValue : '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0 // dizer qual dos valores esta sendo atualizado
}


export default class App extends Component {

  state = {...initialState}

  addDigito = n =>  {
    
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    
    if ( n === '.' && !clearDisplay  && this.state.displayValue.includes('.')) return 



    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if(n !== '.') {
      const newValue  = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }

  }

  clearMemory = () => {
    this.setState( { ...initialState })
  }

  setOperation = operation => {  
    if(this.state.current === 0){
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]

      try{
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      }catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({ 
        displayValue: `${values[0]}`,
        operation: equals ? null : operation, 
        current: equals ? 0 : 1,
        // clearDisplay: !equals,
        clearDisplay: true,
        values 
      })
    }
  }

  render() {
    return (
      <View style={styles.Container} >
          <Display  value={this.state.displayValue}/>
          <View style={styles.buttons} > 
            <Botao label='AC' triple onclick={this.clearMemory} />
            <Botao label='/' operation onclick={()=> this.setOperation('/')} />
            <Botao label='7' onclick={this.addDigito} />
            <Botao label='8' onclick={this.addDigito}/>
            <Botao label='9' onclick={this.addDigito}/>
            <Botao label='*' operation onclick={this.setOperation}/>
            <Botao label='4' onclick={this.addDigito}/>
            <Botao label='5' onclick={this.addDigito}/>
            <Botao label='6' onclick={this.addDigito}/>
            <Botao label='-' operation onclick={this.setOperation}/>
            <Botao label='1' onclick={this.addDigito}/>
            <Botao label='2' onclick={this.addDigito}/>
            <Botao label='3' onclick={this.addDigito}/>
            <Botao label='+' operation onclick={this.setOperation}/>
            <Botao label='0' double onclick={this.addDigito}/>
            <Botao label='.' onclick={this.addDigito}/>
            <Botao label='=' operation onclick={this.setOperation} />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    Container: {
      flex: 1,
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
})