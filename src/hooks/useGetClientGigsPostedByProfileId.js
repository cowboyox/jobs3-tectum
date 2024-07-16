import { useQuery } from '@tanstack/react-query';

import api from '@/utils/api';
import { APIS } from '@/utils/constants';


export const useGetClientGigsPostedByProfileId = (profileId, pageNum, itemsPerPage, searchText = '', filters = []) => {
  return useQuery({
    cacheTime: Infinity,
    enabled: pageNum > 0 && itemsPerPage > 0,
    queryFn: async () => {
      console.log("above here fdsafdsa");
      if (pageNum > 0 && itemsPerPage > 0) {
        console.log("above here");
        try {
          let payment = ['any'];
          let skills = ['any'];
          let sort = 0;
          let category = ['any'];
          let applicants = [];
          let experience = 'any';
          let hoursPerWeek = 'any';
          let location = 'any';
          let timezone = 'any';
          let info = 'any';
          let fixed = ['any'];
          let hourly = ['any'];

          filters.map((filter) => {
            if (filter.id === 'payment' && filter.value !== 'any') {
              payment = [...payment, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'applicants') {
              applicants = [...applicants, filter.value];
            } else if (filter.id === 'skills' && filter.value !== 'any') {
              skills = [...skills, filter.value].filter((s) => s !== 'any');
            } else if (filter.id === 'sort') {
              sort = filter.value;
            } else if (filter.id === 'category' && filter.value !== 'any') {
              category = [...category, filter.value].filter((cv) => cv !== 'any');
            } else if (filter.id === 'experience') {
              experience = filter.value;
            } else if (filter.id === 'job_type') {
              payment = [...payment, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'hoursPerWeek') {
              hoursPerWeek = filter.value;
            } else if (filter.id === 'location') {
              location = filter.value;
            } else if (filter.id === 'timezone') {
              timezone = filter.value;
            } else if (filter.id === 'info') {
              info = filter.value;
            } else if (filter.id === 'amount' && filter.value !== 'any') {
              fixed = [...fixed, filter.value].filter((p) => p !== 'any');
            } else if (filter.id === 'hourly' && filter.value !== 'any') {
              hourly = [...hourly, filter.value].filter((p) => p !== 'any');
            }
          });
          if(profileId !== undefined){
            console.log("reached here");
            const { data } = await api.get(
              `${APIS.CL_FIND_GIGS_POSTED_BY_PROFILE_ID}/${profileId}?page=${pageNum}&limit=${itemsPerPage}&searchText=${searchText}&payment=${payment}&skills=${skills}&sort=${sort}&category=${category}&applicants=${applicants}&experience=${experience}&hoursPerWeek=${hoursPerWeek}&location=${location}&timezone=${timezone}&info=${info}&fixed=${fixed}&hourly=${hourly}`
            );
            return data?.data || null;
          }
          else return null;

        } catch (e) {
          console.error(e);

          return null;
        }
      }

      return null;
    },
    queryKey: ['useGetClientGigsPostedByProfileId',profileId, pageNum, itemsPerPage, searchText, filters],
    staleTime: Infinity,
  });
};
