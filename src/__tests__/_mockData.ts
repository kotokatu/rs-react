import type { ApiResponse } from '../components/Search/Search';
const mockApiData: ApiResponse = {
  data: [
    {
      id: 1,
      first_name: 'LeBron',
      height_feet: 6,
      height_inches: 9,
      weight_pounds: 250,
      last_name: 'James',
      position: 'SF',
      team: {
        id: 1,
        abbreviation: 'LAL',
        city: 'Los Angeles',
        conference: 'West',
        division: 'Pacific',
        full_name: 'Los Angeles Lakers',
        name: 'Lakers',
      },
    },
    {
      id: 2,
      first_name: 'Stephen',
      height_feet: 6,
      height_inches: 3,
      weight_pounds: 185,
      last_name: 'Curry',
      position: 'PG',
      team: {
        id: 3,
        abbreviation: 'GSW',
        city: 'Golden State',
        conference: 'West',
        division: 'Pacific',
        full_name: 'Golden State Warriors',
        name: 'Warriors',
      },
    },
    {
      id: 3,
      first_name: 'Kevin',
      height_feet: 6,
      height_inches: 11,
      weight_pounds: 240,
      last_name: 'Durant',
      position: 'PF',
      team: {
        id: 2,
        abbreviation: 'BKN',
        city: 'Brooklyn',
        conference: 'East',
        division: 'Atlantic',
        full_name: 'Brooklyn Nets',
        name: 'Nets',
      },
    },
  ],
  meta: {
    total_pages: 3,
    current_page: 1,
    next_page: 2,
    per_page: 1,
    total_count: 3,
  },
};

export default mockApiData;
