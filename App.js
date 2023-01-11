import {ImageBackground, StyleSheet} from 'react-native';
import Trainer from "./src/features/trainer/components/Trainer";
import {store} from './src/state/store'
import {Provider} from 'react-redux'


export default function App() {
    return (
        <Provider store={store}>
            <ImageBackground source={require('./assets/table-back.png')} style={styles.background}>
                <Trainer/>
            </ImageBackground>
        </Provider>
    );
}

const styles = StyleSheet.create({
    background: {
        width: 793,
        height: 548
    }
});
