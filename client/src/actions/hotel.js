import axios from "axios";

export const createHotel = async (token, data) => {
  console.log('token --> data-->', token, data)
  await axios.post(`/api/create-hotel`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

export const allHotels = async () =>
  await axios.post(`/api/hotels`);

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

// export const sellerHotels = async (token) =>
//   await axios.get(`/api/seller-hotels`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

export const deleteHotel = async (token, hotelId) =>
  await axios.delete(`/api/delete-hotel/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const read = async (hotelId) =>
  await axios.get(`/api/hotel/${hotelId}`);

export const updateHotel = async (token, data, hotelId) =>
  await axios.put(
    `/api/update-hotel/${hotelId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )