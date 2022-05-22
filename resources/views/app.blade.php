<!DOCTYPE html>
<html class="h-full" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:description" content="Memeboard is your best source of popular memes.">
        <meta property="og:image" content="{{ asset('img/memeboard-og.png') }}">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        <link href="https://api.fontshare.com/css?f[]=clash-grotesk@1&f[]=general-sans@700&display=swap" rel="stylesheet">
        @routes
        <script src="{{ mix('js/app.js') }}" defer></script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased h-full">
        @inertia
        @env ('local')
            <script src="http://localhost:8080/js/bundle.js"></script>
        @endenv
    </body>
</html>
