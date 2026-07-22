type Book = {
  title: string;
  author: string;
  image: string;
  description?: string;
  link?: string;
  id?: number;
};

const books: Book[] = [
  {
    title: "The Coaching Habit",
    author: "Michael Bungay Stanier",
    image: "/books/coaching_habit.jpg",
  },
  {
    title:
      "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
    author: "Rober C. Martin",
    image: "/books/clean_architecture.jpg",
  },

  {
    title: "Project Management for he Unofficial Project Manager",
    author: "Kory Kogon & Suzette Blakemore",
    image: "/books/pmupm.jpg",
  },

  {
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    image: "/books/philosophy_of_software_design.jpg",
  },

  {
    title: "Stories Sell",
    author: "Matthew Dicks",
    image: "/books/stories_sell.jpg",
  },
  {
    title: "Clean Agile",
    author: "Robert C. Martin",
    image: "/books/clean_agile.jpg",
  },
  {
    title: "The Complete Website Planning Guide",
    author: "Darryl King",
    image: "/books/complete_website_planning_guide.jpg",
  },

  {
    title: "Clean Code",
    author: "Robert C. Martin",
    image: "/books/clean_code.jpg",
  },
];

export default books;
