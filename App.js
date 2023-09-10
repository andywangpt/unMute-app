import React, { useState, useEffect } from 'react'
import {
	FlatList,
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'
import WordButton from './WordButton.js'
import { WordData } from './WordData.js'
import * as Speech from 'expo-speech'

const numCols = 12

export default function App() {
	const [buttonLayout, setButtonLayout] = useState([...WordData])

	const [displayText, setDisplayText] = useState('')

	useEffect(() => {
		const words = buttonLayout.map((button) => button.word)
		console.log(words)
	}, [buttonLayout])

	const dictateText = () => {
		Speech.speak(displayText)
	}

	const handleHomeButtonPress = () => {
		setButtonLayout(WordData)
	}

	const handleHelloButtonPress = (word) => {
		setDisplayText((prevText) => {
			return prevText + ' Hi, I am Andy. '
		})
		Speech.speak(" Hi, I'm Andy ")
	}

	const getDynamicFontSize = (text) => {
		const wordCount = text.split(' ').length + 2
		if (wordCount <= 1) return 80 // adjust this size as required
		if (wordCount <= 3) return 100
		if (wordCount <= 5) return 60
		if (wordCount <= 7) return 50
		if (wordCount <= 9) return 40
		return 25 // default size for longer sentences
	}

	const deleteLastWord = () => {
		setDisplayText((prevText) => {
			const words = prevText.trim().split(' ')
			if (words.length <= 1) return '' // If only one word or no words, return an empty string.
			words.pop() // Remove the last word.
			return words.join(' ') // Convert the array of words back into a string.
		})
	}

	const clearDisplayText = () => {
		setDisplayText('')
	}

	const handleDoublePress = (pressedWord) => {
		const pressedButton = buttonLayout.find(
			(button) => button.word === pressedWord
		)

		if (pressedButton && pressedButton.pathways) {
			const pathwayWords = pressedButton.pathways.map(
				(pathway) => pathway.id
			)

			const indexStart = buttonLayout.filter(
				(button) =>
					button.category === 'PATHWAY_WORDS' ||
					button.category === 'MENU' ||
					button.category === 'QUESTION_WORDS'
			).length

			console.log('indexStart', indexStart)

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
	}

	const handleLongPress = () => {
		setButtonLayout(WordData)
		console.log('wordData', WordData)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.yStack}>
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
						<Text
							style={[
								{
									fontSize: getDynamicFontSize(displayText),
								},
							]}
						>
							{displayText}
						</Text>
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

				<View style={styles.flatListContainer}>
					<FlatList
						data={buttonLayout}
						renderItem={({ item }) => (
							<WordButton
								text={item.word}
								category={item.category}
								setDisplayText={setDisplayText}
								onDoublePress={handleDoublePress}
								onLongPress={handleLongPress}
								setButtonLayout={setButtonLayout}
							/>
						)}
						keyExtractor={(item) => item.id}
						numColumns={numCols}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2e3a43',
	},
	yStack: {
		flex: 1,
		alignItems: 'center',
		padding: 3,
	},
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
		padding: 1,
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
		margin: 1,
		marginBottom: 0,
		width: '58.5%',
		borderRadius: 10,
	},
	flatListContainer: {
		flex: 1,
		width: '100%',
	},
})
