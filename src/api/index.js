import axios from 'axios';

const getUrl = (method = '') =>
  `http://test.movilbox.co:888/test_mbox/test.php?metodo=${method}`;

const getUsers = () => axios.get(getUrl('usuarios'));

const getPeriods = () => axios.get(getUrl('periodos'));

/**
 * no se que metodo se utiliza, get o post
 * dado que el servicio no retorna 500 al no enviar data no se puede utilizar el catch encadenado
 */
const saveSchedule = async (schedule) => {
  try {
    const response = await axios.post(getUrl('guardar'), schedule);

    if (response.state === 0) {
      throw new Error('no se enviaron datos');
    }

    return true;
  } catch (err) {
    alert('error guardando programación');
    return false;
  }
};

export { getUsers, getPeriods, saveSchedule };
