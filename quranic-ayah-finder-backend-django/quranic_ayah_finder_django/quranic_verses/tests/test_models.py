from django.test import TestCase
from quranic_verses.models import *
from django.contrib.auth.models import User

class TestModels(TestCase):

    def setUp(self):
        # self.guide1 = Guides.objects.create(
        #     name='test',
        #     description='description'
        # )
        self.user = User.objects.create_user('testUSer', 'test@test.com', 'testpassword', id=1)
        self.post1 = Post.objects.create(
            id = 1,
            title='test title',
            description = 'test description',
            user = self.user,
            verse_id = 1,
        )
        self.comment = Comment.objects.create(
            id = 1,
            user = self.user,
            post = self.post1,
            body = 'this is a comment'
        )
        self.guideTopic = GuideTopic.objects.create(id=1,topic_name='Test Topic')
        self.quizQuestion = QuizQuestion.objects.create(
            id=1,
            topic_id = self.guideTopic,
            question = 'test question',
            answer_1 = 'test answer 1',
            answer_2 = 'test answer 2',
            answer_3 = 'test answer 3',
            answer_4 = 'test answer 4',
            correct_answer = 'test answer 1',
            note = 'test note'
        )
        self.quizProgress = UserQuizProgress.objects.create(
            id=1,
            user =self.user,
            quiz_topic_id = self.guideTopic,
            score = 2,
        )
        self.guideContent = GuideContent.objects.create(
            id=1,
            topic_id = self.guideTopic,
            content = 'test content'
        )
        self.savedVerse = UserSavedVerse.objects.create(
            id=1,
            user = self.user,
            verse_key = '1:1',
            translation = 'test translation',
            user_notes = 'test user notes'
        )

    def test_User_model(self):
        user = User.objects.get(id=1)
        self.assertEqual(user.username, 'testUSer')
        self.assertEqual(user.email, 'test@test.com')

    def test_Post_model(self):
        post = Post.objects.get(id=1)
        self.assertEqual(post.title, 'test title')
        self.assertEqual(post.description, 'test description')
        self.assertEqual(post.user, self.user)
        self.assertEqual(post.verse_id, 1)
        self.assertEqual(post.__str__(), post.title)

    def test_Comment_model(self):
        comment = Comment.objects.get(id=1)
        self.assertEqual(comment.user, self.user)
        self.assertEqual(comment.post, self.post1)
        self.assertEqual(comment.body, 'this is a comment')
        self.assertEqual(comment.__str__(), {"post id ":comment.post.id,"":comment.body[0:50]})

    def test_Guide_Topic_model(self):
        guide = GuideTopic.objects.get(id=1)
        self.assertEqual(guide.topic_name, 'Test Topic')
        self.assertEqual(guide.__str__(), guide.topic_name[0:50])
    
    def test_Quiz_Question_model(self):
        question = QuizQuestion.objects.get(id=1)
        self.assertEqual(question.topic_id.topic_name, 'Test Topic')
        self.assertEqual(question.question, 'test question')
        self.assertEqual(question.answer_1, 'test answer 1')
        self.assertEqual(question.answer_2, 'test answer 2')
        self.assertEqual(question.answer_3, 'test answer 3')
        self.assertEqual(question.answer_4, 'test answer 4')
        self.assertEqual(question.correct_answer, 'test answer 1')
        self.assertEqual(question.note, 'test note')
        self.assertEqual(question.__str__(), str(("topic",question.topic_id.pk, "question", question.pk)))
    

    #  user =self.user,
    #         quiz_topic_id = self.guideTopic,
    #         score = 2,
    #     )
    #     self.guideContent = GuideContent.objects.create(
    #         topic_id = self.guideTopic,
    #         content = 'test content'
    #     )
    #     self.savedVerse = UserSavedVerse.objects.create(
    #         user = self.user,
    #         verse_key = '1:1',
    #         translation = 'test translation',
    #         user_notes = 'test user notes'

    def test_User_Quiz_model(self):
        progress = UserQuizProgress.objects.get(id=1)
        self.assertEqual(progress.quiz_topic_id.topic_name, 'Test Topic')
        self.assertEqual(progress.score, 2)
        self.assertEqual(progress.__str__(), str((progress.user.username,str(("topic",progress.quiz_topic_id.pk)))))
    
    def test_Guide_Content_model(self):
        content = GuideContent.objects.get(id=1)
        self.assertEqual(content.topic_id.topic_name, 'Test Topic')
        self.assertEqual(content.content, 'test content')
        self.assertEqual(content.__str__(), str({'content no ':content.id,'topic ':content.topic_id.topic_name}))

    def User_Saved_Verse(self):
        verse = UserSavedVerse.objects.get(id=1)
        self.assertEqual(verse.user.username, 'testUser')
        self.assertEqual(verse.verse_key, '1:1')
        self.assertEqual(verse.translation, 'test translation')
        self.assertEqual(verse.user_notes, 'test user notes')
        self.assertEqual(verse.__str__(), verse.verse_key)




