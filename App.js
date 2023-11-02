import React, { useState, useEffect, useRef } from 'react'

import {
	FlatList,
	SafeAreaView,
	View,
	StyleSheet,
	Keyboard,
	Dimensions,
} from 'react-native'

import { ColorThemes } from './ColorThemes.js'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native'
import { MenuButtonData } from './MenuButtonData.js'
import { WordData } from './WordData.js'
import { WordDataTW } from './WordDataTW.js'

import DraggableFlatList from 'react-native-draggable-flatlist'
import TopMenuButtons from './TopMenuButtons.js'
import SideMenuButton from './SideMenuButton.js'
import WordButton from './WordButton.js'

LogBox.ignoreAllLogs(true)

const numCols = 12
const numRows = 9
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const buttonMargin = 1
const buttonWidth = screenWidth / numCols - 2 * buttonMargin 
const buttonHeight = screenHeight / numRows - 2 * buttonMargin - 6

export default function App() {
	const [buttonLayout, setButtonLayout] = useState([...WordDataTW])
	const [menuLayout, setMenuLayout] = useState([...MenuButtonData])
	const [displayText, setDisplayText] = useState('')
	const [showKeyboard, setShowKeyboard] = useState(false)
	const [keyboardInput, setKeyboardInput] = useState('')
	const [currentThemeIndex, setCurrentThemeIndex] = useState(0)
	
	const inputRef = useRef(null)
	
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

	const handleDragEnd = ({ data }) => {
		setButtonLayout(data)
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView
				style={[
					styles.container,
					{
						backgroundColor:
							ColorThemes[currentThemeIndex].BACKGROUND_COLOR,
					},
				]}
			>
				<View style={styles.yStack}>
					<TopMenuButtons
						setButtonLayout={setButtonLayout}
						displayText={displayText}
						setDisplayText={setDisplayText}
						showKeyboard={showKeyboard}
						setKeyboardInput={setKeyboardInput}
						keyboardInput={keyboardInput}
						inputRef={inputRef}
						buttonWidth={buttonWidth}
						buttonHeight={buttonHeight}
						currentThemeIndex={currentThemeIndex}
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
										setButtonLayout={setButtonLayout}
										buttonLayout={buttonLayout}
										showKeyboard={showKeyboard}
										setShowKeyboard={setShowKeyboard}
										setKeyboardInput={setKeyboardInput}
										keyboardInput={keyboardInput}
										buttonWidth={buttonWidth}
										buttonHeight={buttonHeight}
										currentThemeIndex={currentThemeIndex}
										setCurrentThemeIndex={
											setCurrentThemeIndex
										}
									/>
								)}
								keyExtractor={(item) => item.id}
							/>
						</View>

						<View style={styles.flatListContainer}>
							<DraggableFlatList
								data={buttonLayout}
								renderItem={({
									item,
									index,
									drag,
									isActive,
								}) => (
									<WordButton
										id={item.id}
										text={item.word}
										category={item.category}
										setDisplayText={setDisplayText}
										onDoublePress={handleDoublePress}
										drag={drag}
										// onLongPress={handleLongPress}
										setButtonLayout={setButtonLayout}
										showKeyboard={showKeyboard}
										setShowKeyboard={setShowKeyboard}
										buttonWidth={buttonWidth}
										buttonHeight={buttonHeight}
										currentThemeIndex={currentThemeIndex}
										setCurrentThemeIndex={
											setCurrentThemeIndex
										}
										
									/>
								)}
								keyExtractor={(item) => item.id}
								numColumns={numCols - 1}
								onDragEnd={handleDragEnd}
							/>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	yStack: {
		padding: 0,
		flex: 1,
		alignItems: 'center',
	},
	flatListContainer: {
		width: '100%',
		marginLeft: 1,
	},
	menuContainer: {
		width: '8.18%',
		marginTop: 1,
	},
	xStack: {
		flexDirection: 'row',
		width: '100%',
		flex: 1,
		padding: 1,
	},
})
