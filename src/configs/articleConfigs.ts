export default {

  /**
   if an artiles's uri is "some-uri-for-article",
   each article directs to {{ARTICLE_PARENT}}/some-uri-for-article.

   In this case, it would be '/read/some-uri-for-article'
   */
  ARTICLE_PARENT: '/read',
  TAG_PARENT: '/tags',
  CATEGORY_PARENT: '/categories',


  /**
   Descriptions about each categories follows this.
   */
  CATEGORIES: {

    "Budgeting" : {
      description: "Budgeting and savings strategies: covers tips and tricks for saving money and managing your finances"
      ,uri: "/categories/budgeting"
      ,coverImage: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      ,accentColor: '#FFB35C'
    },


    "Investing" : {
      description: "Investment basics and portfolio diversification: includes articles on stocks, bonds, mutual funds, and other investment vehicles"
      ,uri: "/categories/investing"
      ,coverImage: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
      ,accentColor: '#FF6179'
    },

    "Retirement" : {
      description: "Retirement planning: focuses on saving for the future, including retirement accounts and other investment strategies"
      ,uri: "/categories/retirement"
      ,coverImage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      ,accentColor: '#1FF0FF'
    },

    "Real Estate" : {
      description: "Real estate investing: explores the world of real estate investing, including rental properties and flipping houses"
      ,uri: "/categories/real-estate"
      ,coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
      ,accentColor: '#47FFB9'
    },

    "Taxes" : {
      description: "Tax planning and optimization: covers ways to reduce your tax burden and maximize your savings"
      ,uri: "/categories/taxes"
      ,coverImage: "https://images.unsplash.com/photo-1583574928052-9a2563277468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      ,accentColor: '#9985FF'
    },

    "Personal Finance" : {
      description: "Personal finance management: offers advice on managing credit, debt, and other aspects of personal finance"
      ,uri: "/categories/personal-finance"
      ,coverImage: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      ,accentColor: '#9AFF75'
    },
  }


}