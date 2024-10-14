import axiosInstance from './api';

export const assignUserToHome = async (identifier, numHome) => {
  try {
    const response = await axiosInstance.post('/home/assign', { identifier, num_home: numHome });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addHome = async (numHome) => {
  try {
    const response = await axiosInstance.post('/home/add', { num_home: numHome });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllHomes = async () => {
  try {
    const response = await axiosInstance.get('/home/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const getResidentsByHome = async (numHome) => {
  try {
    const response = await axiosInstance.get('/home/residents', {
      params: { numHome }
    });
    console.log("Response from /home/residents:", response.data); // Añadir log
    return response.data;
  } catch (error) {
    console.error("Error in getResidentsByHome:", error); // Añadir log
    throw error;
  }
};


export const changeUserRole = async (userId, newRole, numHome) => {
  try {
    const response = await axiosInstance.post('/home/changeRole', null, {
      params: { userId, newRole, numHome }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHouseNumberByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/home/list`);
    let houseNumber = null;
    response.data.forEach(house => {
      house.representatives.forEach(resident => {
        if (resident.email === email) {
          houseNumber = house.numHome;
        }
      });
    });
    return houseNumber;
  } catch (error) {
    throw error;
  }
};