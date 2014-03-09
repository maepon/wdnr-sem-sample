module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'), // パッケージファイルの読み込み

    compass: { // compassの設定
      options: {require: "bootstrap-sass"}, // bootstrap-sassを利用
      dist: { // 製品版設定
        options: {
          sassDir: "source/sass", // sassディレクトリ
          cssDir: "asset/css", // cssディレクトリ
          environment: "production" // 製品版書き出し
        }
      },
      dev: { // 開発用書き出し
        options: {
          sassDir: "source/sass", // sassディレクトリ
          cssDir: "asset/css" // cssディレクトリ
        }
      }
    },
    autoprefixer:{ // autoprefixer設定（ベンダープリフィクス整理）
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9'] // 対象ブラウザの設定
      },
      default: {
        src: "asset/css/style.css", // 読み込みファイル
        dest: "asset/css/style.css" // 書き出しファイル
      }
    },
    cmq: { // combine-media-queries設定（メディアクエリ整理）
      default: {
        src: "asset/css/style.css", // 読み込みファイル
        dest: "asset/css/style.css" // 書き出しファイル
      }
    },
    csscomb: { // csscomb設定（プロパティの順番整理）
      default: {
        src: "asset/css/style.css", // 読み込みファイル
        dest: "asset/css/style.css" // 書き出しファイル
      }
    },
    csso: { // csso設定（CSSのオプティマイズ）
      default: {
        src: "asset/css/style.css", // 読み込みファイル
        dest: "asset/css/style.css" // 書き出しファイル
      }
    },
    jshint: { // jshint設定（JavaScriptチェック）
      options: {
        jshintrc: 'source/javascript/.jshintrc' // 定義ファイルの指定
      },
      src: {
        src: ['source/javascript/*.js'] // チェック対象ファイル
      }
    },
    concat: { // concat設定（ファイル結合）
      jsdefault: { // ライブラリ等との結合
        // 結合のファイルリスト
        src: ["source/jslib/jquery-1.11.0.min.js","source/jslib/jquery.heightLine.js","source/javascript/*.js"],
        dest: "asset/js/sitescript.js" // 結合後のファイル
      },
      license: { // ライセンス表示のための結合
        // 結合のファイルリスト
        src: ["source/license/license.js","asset/js/sitescript.js"],
        dest: "asset/js/sitescript.js" // 結合後のファイル
      }
    },
    uglify: { // uglify設定（結合とミニファイ）
      default: {
        src: ["source/jslib/jquery-1.11.0.min.js","source/jslib/jquery.heightLine.js","source/javascript/*.js"],
        dest: "asset/js/sitescript.js"
      }
    },
    imagemin: { // imagemin設定（画像のオプティマイズ）
      dynamic: {
        files: [{
          expand: true, // ディレクトリの拡張を行う
          cwd : "source/img/", // ベースディレクトリ
          src: "**/*.{png,jpg,gif}", // 対象ファイル
          dest: "asset/img/" // 書き出しディレクトリ
        }]
      }
    },
    connect: { // 簡易サーバー
      uses_defaults: {} // デフォルトで利用（http://localhost:8000）
    },
    watch: { // ファイル更新監視
      options: { // ライブリロードを有効にする
        livereload: true
      },
      compassdev: { // csccファイルの監視
        files: 'source/**/*.scss', // 対象ファイル
        tasks: ['compass:dev'] // 実行タスク（compass開発用）
      },
      jsdev: { // JavaScriptファイルの監視
        files: 'source/**/*.js', // 対象ファイル
        tasks: ['concat:jsdefault'] // 実行タスク（JavaScript開発用）
      },
      img: { // 画像ファイルの監視
        files: 'source/**/*.{png,jpg,gif}', // 対象ファイル
        tasks: ['imagemin'] // 実行タスク（画像のオプティマイズ）
      },
      html: { // HTMLファイルの監視
        files: '**/*.html'
      }
    }
  });

  // プラグイン群のロード
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-connect');

  //
  // タスクの登録
  //

  // デフォルト（ファイル監視してビルド）
  grunt.registerTask('default', ['connect','watch']);
  // 開発用ビルド
  grunt.registerTask('dev', ['compass:dev','concat:jsdefault','imagemin']);
  // 製品用ビルド
  grunt.registerTask('dist', ['compass:dist','autoprefixer','cmq','csscomb','csso','jshint','uglify','concat:license','imagemin']);

};
