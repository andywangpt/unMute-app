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
import MenuTopRow from './MenuTopRow.js'

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
		console.log('wordData', WordData)
		//
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.yStack}>
				<MenuTopRow
					handleHomeButtonPress={handleHomeButtonPress}
					handleHelloButtonPress={handleHelloButtonPress}
					dictateText={dictateText}
					displayText={displayText}
					getDynamicFontSize={getDynamicFontSize}
					deleteLastWord={deleteLastWord}
					clearDisplayText={clearDisplayText}
				/>

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
		justifyContent: 'center',
	},
	yStack: {
		padding: 3,
		flex: 1,
		alignItems: 'center',
	},
	flatListContainer: {
		flex: 1,
		width: '100%',
	},
})
