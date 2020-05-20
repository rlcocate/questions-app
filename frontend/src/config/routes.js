import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import QuestionList from '../pages/questions/list';
import QuestionForm from '../pages/questions/form';
import AnswerList from '../pages/answers';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={QuestionList} />
                <Route path="/questions" exact component={QuestionList} />
                <Route path="/questions/new" component={QuestionForm} />
                <Route path="/answers/:questionId" exact component={AnswerList} />
            </Switch>
        </BrowserRouter>
    );
}