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

  export const AdminPost = async (code,data,token) => {
    try {
      const response = await axios.post(`${baseURL}/AdminUsers/staff/${code}`,data,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const AdminStudentPost = async (code,data,token) => {
    try {
      const response = await axios.post(`${baseURL}/AdminUsers/student/${code}`,data,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const AdminStudentDelete = async (code,id,token) => {
    try {
      const response = await axios.delete(`${baseURL}/AdminUsers/student/${code}/${id}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const AdminstaffDelete = async (code,id,token) => {
    try {
      const response = await axios.delete(`${baseURL}/AdminUsers/staff/${code}/${id}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };



  export const AdminStudentEdit = async (code,id,token,data) => {
    try {
      const response = await axios.put(`${baseURL}/AdminUsers/students/${code}/${id}`,data,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const AdminStaffEdit = async (code,id,token,data) => {
    try {
      const response = await axios.put(`${baseURL}/AdminUsers/staff/${code}/${id}`,data,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
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
  export const TeacherScheduleDelete = async (code,id,token) => {
    try {
      const response = await axios.delete(`${baseURL}/TeacherUsers/Schedule/${code}/${id}`,{
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

  export const GetSchedule = async (token,code) => {
    try {
      const response = await axios.get(`${baseURL}/StudentUsers/Schedule/${code}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  export const GetSyllabus = async (token,code) => {
    try {
      const response = await axios.get(`${baseURL}/StudentUsers/Syllabus/${code}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const GetSutentlist = async (id,token) => {
    try {
      const response = await axios.get(`${baseURL}/StudentUsers/studentlist/${id}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const GetAdminData = async (token,logincode) => {
    try {
      const response = await axios.get(`${baseURL}/AdminUsers/alldata/${logincode}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  };



  export const GetAmount = async (token) => {
    try {
      const response = await axios.get(`${baseURL}/AdminUsers/amount`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const GetTeachersData = async (empid,token) => {
    try {
      const response = await axios.get(`${baseURL}/TeacherUsers/data/${empid}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const GetSutentlist1 = async (id,token) => {
    try {
      const response = await axios.get(`${baseURL}/ParentUsers/studentlist/${id}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };