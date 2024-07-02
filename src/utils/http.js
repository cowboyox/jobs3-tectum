import api from './api';

export async function getGigs(selectedGigs) {
  try {
    const skills = selectedGigs.join(',');
    const response = await api.get(
      `/api/v1/client_gig/fetch_gigs_by_required_skills?skills=${skills}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all gigs:', error.message);
  }
}

export async function getAllCLRecentViews(profileId) {
  try {
    const { data } = await api.get(`/api/v1/recentView/get_all_cl_recent_view/${profileId}`);

    return data;
  } catch (error) {
    console.error('Error fetching cl recent view gigs:', error.message);
  }
}

// export async function getRecentHires() {
//   try {
//     const response = await api.get("/api/spendings");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching projects:", error.message);
//   }
// }

// export async function getRecentHires() {
//   try {
//     const response = await api.get("/api/recent-hires");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching projects:", error.message);
//   }
// }
