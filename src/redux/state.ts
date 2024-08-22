export const state = {
  profilePage: {
    posts: [
      {id: "1", message: "Hi, how are you?", likes: 12},
      {id: "2", message: "It's OK, thanks!", likes: 1},
      {id: "3", message: "Thanks!", likes: 0},
      {id: "4", message: "My nth Post", likes: 5},
      {id: "5", message: "Hello, World!", likes: 8},
    ],
  },
  dialogsPage: {
    dialogs: [
      {id: "1", name: "Ivan"},
      {id: "2", name: "Petya"},
      {id: "3", name: "Jora"},
    ],
    messages: [
      {id: "1", text: "Message 1"},
      {id: "2", text: "Message 2"},
      {id: "3", text: "Message 3"},
    ]
  }
};
