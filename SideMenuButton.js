import React from 'react'
import { useState, useEffect } from 'react'

import { View, Text, StyleSheet, Pressable } from 'react-native'

import RNRestart from 'react-native-restart'

import { WordData } from './WordData.js'
import { buttonStyles } from './styles'
import { getButtonColor } from './ButtonColor'
import { MenuButtonData } from './MenuButtonData.js'
import { ColorThemes } from './ColorThemes.js'

const SideMenuButton = ({
	text,
	category,
	setButtonLayout,
	buttonLayout,
	displayText,
	showKeyboard,
	setShowKeyboard,
	setKeyboardInput,
	setDisplayText,
	buttonWidth,
	buttonHeight,
	currentThemeIndex,
	setCurrentThemeIndex,
	changeTheme,
}) => {
	useEffect(() => {
		if (!showKeyboard) {
			setKeyboardInput(editableText)
		}
	}, [showKeyboard, editableText, setKeyboardInput])

	const [editableText, setEditableText] = useState(displayText)

	const handleMenuPress = () => {
		const pressedButton = MenuButtonData.find(
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
				setButtonLayout(WordData)
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
							button.category !== 'SOCIAL_WORDS' &&
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

			case 'theme':
				setCurrentThemeIndex((prevIndex) => {
					const newIndex = (prevIndex + 1) % ColorThemes.length
					setDisplayText(ColorThemes[newIndex].themeName)
					return newIndex
				})

				break

			default:
				break
		}
	}

	return (
		<Pressable
			onPress={() => handleMenuPress(text)}
			onLongPress={() => RNRestart.Restart()}
			style={({ pressed }) => [
				getButtonColor(
					category,
					pressed,
					currentThemeIndex,
					setDisplayText
				),
				buttonStyles.menuButton,
				{ width: buttonWidth, height: buttonHeight },
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
		margin: 1,
		padding: 0,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',

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
