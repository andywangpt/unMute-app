import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TextInput,
} from 'react-native'
import * as Speech from 'expo-speech'
import { WordData } from './WordData'
import { getButtonColor } from './ButtonColor'
import drag from 'react-native-draggable-flatlist' // This is the original import statement

import { FontAwesome5 } from '@expo/vector-icons'
import { buttonStyles } from './styles'

export default function WordButton({
	id,
	text,
	category,
	setDisplayText,
	onDoublePress,
	setButtonLayout,
	showKeyboard,
	setShowKeyboard,
}) {
	const [currentText, setCurrentText] = useState(text)
	const [lastPressTime, setLastPressTime] = useState(0)
	const [timeoutId, setTimeoutId] = useState(null)
	const [isEditing, setIsEditing] = useState(false)

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
		setShowKeyboard(false)
	}

	// const handleLongPress = () => {
	// 	setIsEditing(true)
	// }

	// function updateWordData(id, newText) {
	// 	// Find the index of the button with the matching id
	// 	const index = WordData.findIndex((button) => button.id === id)

	// 	// If the button is found, update its word property
	// 	if (index !== -1) {
	// 		WordData[index].word = newText
	// 		setButtonLayout([...WordData])

	// 	}
	// }

	function handleLongPress() {
		drag()
		console.log('drag')
	}

	return (
		<Pressable
			// onPress={handleLongPress}
			style={({ pressed }) => [
				getButtonColor(category, pressed),
				buttonStyles.button,
			]}
			onLongPress={handleLongPress}
			delayLongPress={950}
		>
			<View justifyContent='center' alignItems='center'>
				{isEditing ? (
					<TextInput
						value={currentText}
						onChangeText={setCurrentText}
						autoFocus={true}
						onBlur={() => {
							setIsEditing(false)
							updateWordData(id, currentText)
						}}
						style={buttonStyles.buttonText}
					/>
				) : (
					<Text style={buttonStyles.buttonText}>{text}</Text>
				)}
			</View>
		</Pressable>
	)
}
