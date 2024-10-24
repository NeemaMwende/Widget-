from django.shortcuts import render
from openai import OpenAI
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
#import os
# from dotenv import load_dotenv

client = OpenAI(api_key=settings.OPENAI_API_KEY)

@api_view(['POST'])
def chat_with_gpt(request):
    user_message = request.data.get('message')

    if not user_message:
        return Response({"error": "No message provided"}, status=400)

    try:
        response = client.chat.completions.create(model = "gpt-3.5-turbo",
        messages = [{"role": "user", "content": user_message}])
        chatbot_reply = response.choices[0].message.content
        return Response({"reply": chatbot_reply})
    except Exception as e:
        return Response({"error": str(e)}, status=500)