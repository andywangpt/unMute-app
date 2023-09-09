import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Pressable,
} from 'react-native'
import * as Speech from 'expo-speech'
import { WordData } from './WordData'

import { FontAwesome5 } from '@expo/vector-icons'

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

	const styles = StyleSheet.create({
		button: {
			justifyContent: 'center',
			alignItems: 'center',
			margin: 1,
			padding: 1,
			width: '8.18%',
			height: 75,
			borderRadius: 10,
			borderColor: 'black',
			borderWidth: 1,
			// backgroundColor: '#636f6f',
			//MECH #636f6f
		},
		buttonText: {
			color: 'black',
			fontWeight: 'bold',
		},
	})

	const [lastPressedButton, setLastPressedButton] =
		useState(null)

	useEffect(() => {
		setCurrentText(text)
	}, [text])
	//-----------------------------------------------------------------------------
	const getButtonStyle = ({ pressed }) => {
		if (category === 'MENU') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#636f6f',
				},
			]
		}

		if (category === 'QUESTION_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#ffaa00',
				},
			]
		}

		if (category === 'WHO_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#8a9b9b',
				},
			]
		}

		if (category === 'HOW_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#c5dedd',
				},
			]
		}

		if (category === 'WHAT_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#dbe7e4',
				},
			]
		}

		if (category === 'WHEN_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#f3f8f8',
				},
			]
		}

		if (category === 'HOWMUCH_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#dcebeb',
				},
			]
		}

		if (category === 'WHERE_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#c5dedd',
				},
			]
		}

		if (category === 'WHICH_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#9eb2b1',
				},
			]
		}
		if (category === 'SOCIAL_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#768585',
				},
			]
		}
		if (category === 'PATHWAY_WORDS') {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#ffeecc',
				},
			]
		} else {
			return [
				styles.button,
				{
					backgroundColor: pressed
						? '#f1ffff'
						: '#768585',
				},
			]
		}
	}
	//-----------------------------------------------------------
	const handleWordButtonPress = () => {
		const currentTime = new Date().getTime()
		const timeDifference = currentTime - lastPressTime

		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		if (timeDifference < 800) {
			// double press
			console.log('double press', currentText)
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
		console.log('long press', currentText)
		setButtonLayout(WordData)
	}
	//-----------------------------------------------------------------------------

	return (
		<Pressable
			onPress={() => handleWordButtonPress(text)}
			style={getButtonStyle}
			onLongPress={handleLongPress}
			delayLongPress={750}
		>
			<View>
				<FontAwesome5
					name='school'
					size={24}
					color='black'
				/>
				<Text style={styles.buttonText}>{text}</Text>
			</View>
		</Pressable>
	)
}

//-----------------------------------------------------------------------------

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
