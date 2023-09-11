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

import MenuTopRow from './MenuTopRow.js'
import { MenuData } from './MenuData.js'
import SideMenuButton from './SideMenuButton.js'
import { TextInput } from 'react-native'
import { Keyboard } from 'react-native'
import { useRef } from 'react'

const numCols = 11

export default function App() {
	const [buttonLayout, setButtonLayout] = useState([...WordData])
	const [menuLayout, setMenuLayout] = useState([...MenuData])
	const [displayText, setDisplayText] = useState('')

	const [showKeyboard, setShowKeyboard] = useState(false) // State variable to control keyboard visibility
	const [keyboardInput, setKeyboardInput] = useState('') // State variable to store keyboard input

	const inputRef = useRef(null)

	useEffect(() => {
		const words = buttonLayout.map((button) => button.word)
		console.log(words)
	}, [buttonLayout])

	useEffect(() => {
		const menu = menuLayout.map((button) => button.word)
		console.log(menu)
	}, [menuLayout])

	useEffect(() => {
		if (showKeyboard) {
			inputRef.current.focus()
		}
	}, [showKeyboard])

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setShowKeyboard(false)
			}
		)

		return () => {
			keyboardDidHideListener.remove()
		}
	}, [])

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
	}

	const handleLongPress = () => {
		console.log('wordData', WordData)
		//
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.yStack}>
				<MenuTopRow
					// handleHomeButtonPress={handleHomeButtonPress}
					// handleHelloButtonPress={handleHelloButtonPress}
					// dictateText={dictateText}
					setButtonLayout={setButtonLayout}
					displayText={displayText}
					setDisplayText={setDisplayText}
					// getDynamicFontSize={getDynamicFontSize}
					// deleteLastWord={deleteLastWord}
					// clearDisplayText={clearDisplayText}
					showKeyboard={showKeyboard}
					setKeyboardInput={setKeyboardInput}
					keyboardInput={keyboardInput}
					inputRef={inputRef}
				/>

				<View style={styles.xStack}>
					<View style={styles.menuContainer}>
						<FlatList
							data={menuLayout}
							renderItem={({ item }) => (
								<SideMenuButton
									text={item.word}
									category={item.category}
									setDisplayText={setDisplayText}
									displayText={displayText}
									// onPress={handleMenuPress}
									onLongPress={handleLongPress}
									setButtonLayout={setButtonLayout}
									showKeyboard={showKeyboard}
									setShowKeyboard={setShowKeyboard}
									setKeyboardInput={setKeyboardInput}
									keyboardInput={keyboardInput}
								/>
							)}
							keyExtractor={(item) => item.id}
						/>
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
		padding: 1,
		flex: 1,
		alignItems: 'center',
	},
	flatListContainer: {
		width: '100%',
	},
	menuContainer: {
		width: '8.18%',
	},
	xStack: {
		flexDirection: 'row',
		width: '100%',
		flex: 1,
		padding: 1,
	},
})
