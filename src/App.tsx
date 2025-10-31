import { AuthProvider } from './context/AuthContext';
import Forum from './pages/Forum';

function App() {
  return (
    <AuthProvider>
      <Forum />
    </AuthProvider>
  );
}

export default App;
