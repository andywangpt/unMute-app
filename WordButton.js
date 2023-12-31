import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, TextInput } from 'react-native'
import * as Speech from 'expo-speech'
import { WordData } from './WordData'
import { getButtonColor } from './ButtonColor'

import { buttonStyles } from './styles'

export default function WordButton({
	id,
	text,
	category,
	drag,
	setDisplayText,
	onDoublePress,
	setButtonLayout,
	showKeyboard,
	setShowKeyboard,
	buttonWidth,
	buttonHeight,
	currentThemeIndex,
	setCurrentThemeIndex
}) {
	const [currentText, setCurrentText] = useState(text)
	const [lastPressTime, setLastPressTime] = useState(0)
	const [timeoutId, setTimeoutId] = useState(null)
	const [isEditing, setIsEditing] = useState(false)

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
				Speech.speak(currentText, { language: 'zh-TW' })
			}, 800)
			setTimeoutId(id)
		}
		setLastPressTime(currentTime)
		setShowKeyboard(false)
	}

	const handleLongPress = () => {
		setIsEditing(true)
	}

	function updateWordData(id, newText) {
		const index = WordData.findIndex((button) => button.id === id)

		if (index !== -1) {
			WordData[index].word = newText
		}
	}

	return (
		<Pressable
			onPress={handleWordButtonPress}
			style={({ pressed }) => [
				getButtonColor(category, pressed, currentThemeIndex, setDisplayText),
				buttonStyles.button,
				{ width: buttonWidth, height: buttonHeight },
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
					<Text style={buttonStyles.buttonText}>
						{currentText}
					</Text>
				)}
			</View>
		</Pressable>
	)
}
