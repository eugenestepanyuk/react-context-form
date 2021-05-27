import 'antd/dist/antd.css';
import { FormProvider } from './Context/form.context';

import Form from './Components/Form';

function App() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}

export default App;
