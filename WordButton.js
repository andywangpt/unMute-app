import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import * as Speech from 'expo-speech'
import { WordData } from './WordData'
import { getButtonColor } from './ButtonColor'

import { FontAwesome5 } from '@expo/vector-icons'
import { buttonStyles } from './styles'

export default function WordButton({
	text,
	category,
	setDisplayText,
	onDoublePress,
	onLongPress,
	setButtonLayout,
}) {
	const [currentText, setCurrentText] = useState(text)
	const [lastPressTime, setLastPressTime] = useState(0)
	const [timeoutId, setTimeoutId] = useState(null)

	const [lastPressedButton, setLastPressedButton] = useState(null)

	useEffect(() => {
		setCurrentText(text)
	}, [text])

	const handleWordButtonPress = () => {
		const currentTime = new Date().getTime()
		const timeDifference = currentTime - lastPressTime

		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		if (timeDifference < 800) {
			onDoublePress(currentText)
		} else {
			const id = setTimeout(() => {
				setDisplayText((prevText) => {
					return prevText + ' ' + currentText
				})
				Speech.speak(currentText)
			}, 800)
			setTimeoutId(id)
		}
		setLastPressTime(currentTime)
	}

	const handleLongPress = () => {
		setButtonLayout(WordData)
	}

	return (
		<Pressable
			onPress={() => handleWordButtonPress(text)}
			style={({ pressed }) => [
				getButtonColor(category, pressed),
				buttonStyles.button,
			]}
			onLongPress={handleLongPress}
			delayLongPress={750}
		>
			<View justifyContent='center' alignItems='center'>
				{/* <FontAwesome5
					name='school'
					size={20}
					color='black'
				/> */}
				<Text style={buttonStyles.buttonText}>{text}</Text>
			</View>
		</Pressable>
	)
}

// const menuButtonStyle = {
//   justifyContent: 'center',
//   alignItems: 'center',
//   margin: 0,
//   padding: 0,
//   height: 75,
//   width: '8.18%',
//   borderRadius: '10',
//   borderWidth: 10,
//   borderColor: '#fff',
//   backgroundColor: '#636f6f',
//   //MECH #636f6f
// };
