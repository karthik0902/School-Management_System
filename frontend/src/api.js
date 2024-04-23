import axios from 'axios';

const baseURL = 'http://localhost:3002';

export const studentLogin = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/StudentUsers/login`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const studentSignup = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/StudentUsers/signup`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const teacherLogin = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/TeacherUsers/login`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const teacherSignup = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/TeacherUsers/signup`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };



  export const ParentLogin = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/ParentUsers/login`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const ParentSignup = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/ParentUsers/signup`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const AdminLogin = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/AdminUsers/login`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const AdminSignup = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/AdminUsers/signup`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const AdminPost = async (code,data) => {
    try {
      const response = await axios.post(`${baseURL}/AdminUsers/staff/${code}`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const AdminStudentPost = async (code,data) => {
    try {
      const response = await axios.post(`${baseURL}/AdminUsers/student/${code}`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const teacherSchedulePost = async (code,data,token) => {
    try {
      const response = await axios.post(`${baseURL}/TeacherUsers/Schedule/${code}`,data ,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const teacherSyllabusPost = async (code,data,token) => {
    try {
      const response = await axios.post(`${baseURL}/TeacherUsers/Syllabus/${code}`,data,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const PerformancePost = async (code,data,token) => {
    try {
      const response = await axios.post(`${baseURL}/TeacherUsers/Performance/${code}`,data,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const GetSchedule = async () => {
    try {
      const response = await axios.get(`${baseURL}/StudentUsers/Schedule`,);
      return response;
    } catch (error) {
      throw error;
    }
  };
  export const GetSyllabus = async () => {
    try {
      const response = await axios.get(`${baseURL}/StudentUsers/Syllabus`,);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const GetSutentlist = async () => {
    try {
      const response = await axios.get(`${baseURL}/StudentUsers/studentlist`,);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const GetData = async () => {
    try {
      const response = await axios.get(`${baseURL}/AdminUsers/`,);
      return response;
    } catch (error) {
      throw error;
    }
  };