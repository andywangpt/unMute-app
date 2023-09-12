// import { AppRegistry } from 'react-native'
// import App from './App'
// import { name as appName } from './app.json'

// AppRegistry.registerComponent(appName, () => App)
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import React, { useState, useEffect, useRef } from 'react'
import {
	FlatList,
	SafeAreaView,
	View,
	StyleSheet,
	Keyboard,
} from 'react-native'

import MenuTopRow from './MenuTopRow.js'
import SideMenuButton from './SideMenuButton.js'
import WordButton from './WordButton.js'

import { MenuData } from './MenuData.js'
import { WordData } from './WordData.js'

// console.disableYellowBox = true
import { LogBox } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'

// LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

const numCols = 11

export default function App() {
	const [buttonLayout, setButtonLayout] = useState([...WordData])
	const [menuLayout, setMenuLayout] = useState([...MenuData])
	const [displayText, setDisplayText] = useState('')
	const [showKeyboard, setShowKeyboard] = useState(false)
	const [keyboardInput, setKeyboardInput] = useState('')

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
		<SafeAreaView style={styles.container}>
			<View style={styles.yStack}>
				<MenuTopRow
					setButtonLayout={setButtonLayout}
					displayText={displayText}
					setDisplayText={setDisplayText}
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
									setButtonLayout={setButtonLayout}
									buttonLayout={buttonLayout}
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
								/>
							)}
							keyExtractor={(item) => item.id}
							numColumns={numCols}
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
