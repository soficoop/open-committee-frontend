export const getMeetings = `query getMeetings($date: String!){
  meetings(where: {date_gt: $date} sort: "date"){
    id
    date
    committee {
      sid
    }
  }
}`;

export const getMeeting = `query getMeeting($id: ID!){
  meeting(id: $id){
    id
    sid
    number
    date
    committee {
      sid
      parent {
        sid
      }
      meetings(sort: "date:desc" where: {_id_ne: $id}) {
        id
        date
        number
      }
    }
    plans {
      id
      name
      number
      status
      lastUpdate
      location
    }
  }
}`;

export const getPlan = `query getPlan($id: ID!) {
  plan(id: $id){
    id
    sid
    number
    lastUpdate
    location
    municipality
    targets
    meetings {
      id
      date
      number
    }
  }
}`;
