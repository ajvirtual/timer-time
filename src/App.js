import { Route, Link, Switch } from 'react-router-dom'
import './styles/all/rootStyles.css'
import './styles/all/styles.css'
import Main from './pages/main/'

function App() {
  return (
    <>
      <div className="extra-page-container">
        <Main />
      </div>
    </>
  )
}

export default App;