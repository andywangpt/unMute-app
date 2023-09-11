import React from 'react'
import { useState, useEffect } from 'react'

import { View, Text, StyleSheet, Pressable } from 'react-native'

import { WordData } from './WordData.js'
import { buttonStyles } from './styles'
import { getButtonColor } from './ButtonColor'
import { MenuData } from './MenuData.js'

const SideMenuButton = ({
	text,
	category,
	setButtonLayout,
	buttonLayout,
	displayText,
	showKeyboard,
	setShowKeyboard,
	setKeyboardInput,
}) => {
	useEffect(() => {
		if (!showKeyboard) {
			setKeyboardInput(editableText)
		}
	}, [showKeyboard, editableText, setKeyboardInput])

	const [editableText, setEditableText] = useState(displayText)

	const handleMenuPress = () => {
		const pressedButton = MenuData.find(
			(button) => button.word === text
		)

		switch (text) {
			case '#':
				if (pressedButton && pressedButton.pathways) {
					const pathwayWords = pressedButton.pathways.map(
						(pathway) => pathway.id
					)

					const indexStart = buttonLayout.filter(
						(button) => button.category === 'PATHWAY_WORDS'
					).length

					const newLayout = buttonLayout.map((button, index) => {
						if (
							button.category !== 'MENU' &&
							index >= indexStart &&
							index - indexStart < pathwayWords.length
						) {
							return {
								...button,
								word: pathwayWords[index - indexStart],
								category: 'PATHWAY_WORDS',
							}
						}
						return button
					})

					setButtonLayout(newLayout)
				}
				break

			case 'core':
				if (pressedButton && pressedButton.pathways) {
					const pathwayWords = pressedButton.pathways.map(
						(pathway) => pathway.id
					)

					const indexStart = buttonLayout.filter(
						(button) =>
							button.category === 'PATHWAY_WORDS' &&
							button.category === 'MENU' &&
							button.category === 'QUESTION_WORDS' &&
							button.category === 'SOCIAL_WORDS'
					).length

					const newLayout = buttonLayout.map((button, index) => {
						if (
							button.category !== 'MENU' &&
							button.category !== 'QUESTION_WORDS' &&
							index >= indexStart &&
							index - indexStart < pathwayWords.length
						) {
							return {
								...button,
								word: pathwayWords[index - indexStart],
								category: 'PATHWAY_WORDS',
							}
						}
						return button
					})

					setButtonLayout(newLayout)
				}
				break

			case 'phrases':
				if (pressedButton && pressedButton.pathways) {
					const pathwayWords = pressedButton.pathways.map(
						(pathway) => pathway.id
					)

					const indexStart = buttonLayout.filter(
						(button) =>
							button.category === 'PATHWAY_WORDS' &&
							button.category === 'MENU' &&
							button.category === 'QUESTION_WORDS' &&
							button.category === 'SOCIAL_WORDS'
					).length

					const newLayout = buttonLayout.map((button, index) => {
						if (
							button.category !== 'QUESTION_WORDS' &&
							index >= indexStart &&
							index - indexStart < pathwayWords.length
						) {
							return {
								...button,
								word: pathwayWords[index - indexStart],
								category: 'PATHWAY_WORDS',
							}
						}
						return button
					})

					setButtonLayout(newLayout)
				}
				break

			case 'topics':
				break

			case 'keyboard':
				setKeyboardInput(displayText)
				setShowKeyboard(true)
				break

			case 'settings':
				break

			case 'back':
				setButtonLayout(WordData)
				break

			default:
				break
		}
		console.log('handleMenuPress: ', text)
	}

	return (
		<Pressable
			onPress={() => handleMenuPress(text)}
			style={({ pressed }) => [
				getButtonColor(category, pressed),
				buttonStyles.menuButton,
			]}
		>
			<View justifyContent='center' alignItems='center'>
				<Text style={buttonStyles.buttonText}>{text}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	xStack: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 1,
		backgroundColor: '#2e3a43',
	},
	menuButton: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 0.5,
		padding: 0,
		height: 75,
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
		height: 75,
		backgroundColor: '#F0EFEB',
		margin: 2,
		marginBottom: 0,
		width: '58.5%',
		borderRadius: 10,
	},
})

export default SideMenuButton
