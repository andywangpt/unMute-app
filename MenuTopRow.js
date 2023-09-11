import { useState, useEffect, useRef, React } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
} from 'react-native'

import * as Speech from 'expo-speech'

import { WordData } from './WordData.js'

const MenuTopRow = ({
	displayText,
	setDisplayText,
	showKeyboard, // Receive showKeyboard prop
	setKeyboardInput, // Receive setKeyboardInput
	keyboardInput, // Receive keyboardInput
	inputRef, // Receive inputRef
	setButtonLayout,
}) => {
	
	const dictateText = () => {
		Speech.speak(displayText)
	}

	const handleHomeButtonPress = () => {
		setButtonLayout(WordData)
	}

	const handleHelloButtonPress = (word) => {
		setDisplayText((prevText) => {
			return (
				prevText + ' Hi, I am Andy. This is my talking soundboard'
			)
		})
		Speech.speak(" Hi, I'm Andy.  This is my talking soundboard.")
	}

	const getDynamicFontSize = (text) => {
		const wordCount = text.split(' ').length + 2
		if (wordCount <= 1) return 80
		if (wordCount <= 3) return 100
		if (wordCount <= 5) return 60
		if (wordCount <= 7) return 50
		if (wordCount <= 9) return 40
		return 25
	}

	const deleteLastWord = () => {
		setDisplayText((prevText) => {
			const words = prevText.trim().split(' ')
			if (words.length <= 1) return ''
			words.pop()
			return words.join(' ')
		})
	}

	const clearDisplayText = () => {
		setDisplayText('')
	}

	return (
		<View style={styles.xStack}>
			<TouchableOpacity
				onPress={handleHomeButtonPress}
				style={styles.menuButton}
			>
				<Text style={styles.buttonText}>🏠</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.menuButton}
				onPress={handleHelloButtonPress}
			>
				<Text style={styles.buttonText}>👋🏼</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.displayStyle}
				onPress={dictateText}
			>
				<TextInput
					ref={inputRef}
					style={[
						{
							fontSize: getDynamicFontSize(
								showKeyboard ? keyboardInput : displayText
							),
						},
					]}
					value={showKeyboard ? keyboardInput : displayText}
					onChangeText={(text) => {
						if (showKeyboard) {
							setKeyboardInput(text)
						} else {
							setDisplayText(text)
						}
					}}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.menuButton}
				onPress={deleteLastWord}
			>
				<Text style={styles.buttonText}>⬅️</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.menuButton}
				onPress={clearDisplayText}
			>
				<Text style={styles.buttonText}>X</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={handleHomeButtonPress}
				style={styles.menuButton}
			>
				<Text style={styles.buttonText}>🏠</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	xStack: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1,
		marginBottom: 0,
		backgroundColor: '#2e3a43',
	},
	menuButton: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1,
		padding: 0,
		height: 80,
		width: '8.18%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#636f6f',
	},
	buttonText: {
		fontSize: 35,
		justifyContent: 'center',
	},
	displayStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,
		backgroundColor: '#F0EFEB',
		margin: 3,
		marginBottom: 0,
		width: '57.5%',
		borderRadius: 10,
	},
})

export default MenuTopRow
