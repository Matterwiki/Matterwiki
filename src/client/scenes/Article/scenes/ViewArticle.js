import React from 'react'
import { Row, Col } from 'ui'

import ArticleHeading from '../components/ArticleHeading'
import WikiEditor from '../components/WikiEditor/WikiEditor'
import ArticleSidebar from '../components/ArticleSidebar'

const ViewArticle = ({ article, onDeleteClick: handleDeleteClick, onEditClick: handleEditClick, onHistoryClick: handleHistoryClick }) => {
  const isAdmin = parseInt(window.localStorage.getItem('userId'), 10) === 1

  return (
    <Row>
      <Col>
        <ArticleHeading article={article}>{article.title}</ArticleHeading>
        <WikiEditor readOnly rawContent={JSON.parse(article.content)} />
      </Col>
      <Col widthMedium='30'>
        <ArticleSidebar
          article={article}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onHistoryClick={handleHistoryClick}
          isAdmin={isAdmin}
        />
      </Col>
    </Row>
  )
}

export default ViewArticle
