import { useEffect, useState } from 'react';
import { Pagination, Skeleton } from '@mui/material';
import { Card } from '../Card';
import { PlaceHolder } from '../PlaceHolder';
import { ratedMovie } from '../../utils/getmovies'; // Импортируем функцию для получения оцененных фильмов

export const ratedPage = () => {
  const [ratedMovies, setRatedMovies] = useState([]); // Состояние для хранения оцененных фильмов
  const [page, setPage] = useState(1); // Текущая страница
  const [totalPage, setTotalPage] = useState(1); // Общее количество страниц
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  const loadRatedMovies = (page) => {
    setIsLoading(true);
    ratedMovie(page) // Получаем оцененные фильмы для данной страницы
      .then((res) => {
        setRatedMovies(res.results); // Сохраняем результат в стейт
        setTotalPage(res.total_pages); // Устанавливаем количество страниц
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false)); // Останавливаем индикатор загрузки
  };

  useEffect(() => {
    loadRatedMovies(page); // Загружаем оцененные фильмы при изменении страницы
  }, [page]); // Эффект срабатывает при изменении номера страницы

  return (
    <>
      {isLoading ? (
        <div className="cardGrid">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} height={281} />
          ))}
        </div>
      ) : ratedMovies.length ? (
        <div className="cardGrid">
          {ratedMovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <PlaceHolder text="У вас нет оцененных фильмов" />
      )}
      <Pagination
        count={totalPage}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
        disabled={isLoading}
      />
    </>
  );
};
