import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, Lock, Trash2, Edit3, Sparkles, User as UserIcon, AlertCircle, ThumbsUp } from 'lucide-react';
import { Course, CourseReview, User } from '../types';

interface ReviewSectionProps {
  course: Course;
  reviews: CourseReview[];
  user: User | null;
  isEnrolled: boolean;
  onAddReview: (review: Omit<CourseReview, 'id' | 'createdAt'>) => void;
  onDeleteReview?: (reviewId: string) => void;
  onEnroll: (course: Course) => void;
  onOpenAuth: () => void;
  lang: 'km' | 'en';
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  course,
  reviews,
  user,
  isEnrolled,
  onAddReview,
  onDeleteReview,
  onEnroll,
  onOpenAuth,
  lang,
}) => {
  const isKm = lang === 'km';

  // Filter reviews for this course
  const courseReviews = reviews.filter((r) => r.courseId === course.id);

  // Calculate rating stats
  const totalReviews = courseReviews.length;
  const averageRating = totalReviews > 0
    ? (courseReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : course.rating.toFixed(1);

  // Rating distribution counts (5 to 1 star)
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = courseReviews.filter((r) => r.rating === star).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, count, percentage };
  });

  // Check if current user has already left a review
  const existingUserReview = user
    ? courseReviews.find((r) => r.userId === user.id)
    : null;

  // Form states
  const [rating, setRating] = useState<number>(existingUserReview ? existingUserReview.rating : 5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>(existingUserReview ? existingUserReview.comment : '');
  const [isEditing, setIsEditing] = useState<boolean>(!existingUserReview);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isEnrolled) return;
    if (!comment.trim()) return;

    onAddReview({
      courseId: course.id,
      userId: user.id,
      userName: user.name || (isKm ? 'សិស្សអនឡាញ' : 'Student'),
      userAvatar: user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating,
      comment: comment.trim(),
      isVerifiedEnrolled: true,
    });

    setIsEditing(false);
  };

  const handleHelpfulClick = (reviewId: string) => {
    if (votedReviews[reviewId]) return;
    setHelpfulVotes((prev) => ({ ...prev, [reviewId]: (prev[reviewId] || 0) + 1 }));
    setVotedReviews((prev) => ({ ...prev, [reviewId]: true }));
  };

  // Rating labels mapping
  const ratingLabels: Record<number, { km: string; en: string }> = {
    5: { km: 'ល្អឥតខ្ចោះ! (Excellent)', en: 'Excellent!' },
    4: { km: 'ល្អច្រើន (Very Good)', en: 'Very Good' },
    3: { km: 'ល្អសមរម្យ (Good)', en: 'Good' },
    2: { km: 'មធ្យម (Fair)', en: 'Fair' },
    1: { km: 'ត្រូវកែលម្អ (Needs Improvement)', en: 'Needs Improvement' },
  };

  const filteredReviewsList = filterRating === 'all'
    ? courseReviews
    : courseReviews.filter((r) => r.rating === filterRating);

  return (
    <div className="space-y-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
      
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{isKm ? 'ការវាយតម្លៃ និងមតិយោបល់' : 'Ratings & Student Reviews'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-1">
            {isKm ? 'ការវាយតម្លៃពីសិស្សដែលបានរៀន' : 'Student Feedback & Reviews'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200/60">
            {totalReviews} {isKm ? 'ការវាយតម្លៃសរុប' : 'Total Reviews'}
          </span>
        </div>
      </div>

      {/* OVERALL RATING & BREAKDOWN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80">
        
        {/* Score Summary Box */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-white rounded-2xl border border-slate-200/60 shadow-2xs">
          <div className="text-5xl font-black text-slate-900 font-heading tracking-tight">
            {averageRating}
          </div>

          <div className="flex items-center gap-1 my-2 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-5 h-5 ${
                  s <= Math.round(Number(averageRating))
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            ))}
          </div>

          <p className="text-xs font-semibold text-slate-500">
            {isKm ? 'ពិន្ទុមធ្យមសរុប' : 'Course Average Rating'} ({totalReviews} {isKm ? 'ការវាយតម្លៃ' : 'reviews'})
          </p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2">
          {ratingCounts.map(({ star, count, percentage }) => (
            <div
              key={star}
              onClick={() => setFilterRating(filterRating === star ? 'all' : star)}
              className="flex items-center gap-3 text-xs font-semibold text-slate-600 cursor-pointer group hover:text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-1 w-12 shrink-0">
                <span>{star}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>

              {/* Progress bar background */}
              <div className="flex-1 h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="w-16 text-right shrink-0 text-[11px] text-slate-500 font-medium group-hover:text-slate-800">
                {count} ({percentage}%)
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ENROLLED STUDENT REVIEW SUBMISSION FORM */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
        
        {!user ? (
          /* NOT LOGGED IN BANNER */
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
            <div className="flex items-start gap-3 text-center sm:text-left">
              <div className="p-3 bg-white/10 rounded-xl text-amber-300 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">
                  {isKm ? 'ចង់សរសេរការវាយតម្លៃមែនទេ?' : 'Want to leave a review?'}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {isKm 
                    ? 'សូមចូលប្រើប្រាស់គណនី និងចុះឈ្មោះចូលរៀនវគ្គនេះ ដើម្បីអាចចែករំលែកមតិយោបល់ និងផ្តល់ផ្កាយវាយតម្លៃ។' 
                    : 'Please sign in and enroll in this course to submit a star rating and review.'}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              <span>{isKm ? 'ចូលប្រើប្រាស់គណនី' : 'Sign In to Review'}</span>
            </button>
          </div>
        ) : !isEnrolled ? (
          /* LOGGED IN BUT NOT ENROLLED BANNER */
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
            <div className="flex items-start gap-3 text-center sm:text-left">
              <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">
                  {isKm ? 'សម្រាប់តែសិស្សបានចុះឈ្មោះចូលរៀន' : 'Enrolled Students Only'}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {isKm 
                    ? 'មានតែសិស្សដែលបានចុះឈ្មោះចូលរៀនវគ្គសិក្សានេះប៉ុណ្ណោះ ទើបអាចវាយតម្លៃផ្តល់ផ្កាយ និងមតិយោបល់បាន។' 
                    : 'Only students enrolled in this course can leave a rating and short review.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onEnroll(course)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{isKm ? 'ចុះឈ្មោះចូលរៀនឥឡូវនេះ' : 'Enroll Now to Review'}</span>
            </button>
          </div>
        ) : existingUserReview && !isEditing ? (
          /* ALREADY REVIEWED SUMMARY CARD */
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isKm ? 'អ្នកបានវាយតម្លៃវគ្គសិក្សានេះរួចរាល់ហើយ' : 'You reviewed this course'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5 text-blue-300" />
                  <span>{isKm ? 'កែប្រែការវាយតម្លៃ' : 'Edit Review'}</span>
                </button>

                {onDeleteReview && (
                  <button
                    onClick={() => onDeleteReview(existingUserReview.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-rose-500/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isKm ? 'លុប' : 'Delete'}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-400 pt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= existingUserReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                />
              ))}
              <span className="text-xs font-bold text-amber-300 ml-2">
                {existingUserReview.rating} / 5
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{existingUserReview.comment}"
            </p>
          </div>
        ) : (
          /* SUBMIT / EDIT REVIEW FORM FOR ENROLLED STUDENT */
          <form onSubmit={handleRatingSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
                <MessageSquarePlus className="w-4 h-4" />
                <span>{isKm ? 'សរសេរការវាយតម្លៃវគ្គសិក្សា' : 'Write a Review for this Course'}</span>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-amber-400/50"
                />
                <span className="text-xs font-semibold text-slate-300">{user.name}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
                  {isKm ? 'សិស្សផ្លូវការ' : 'Enrolled Student'}
                </span>
              </div>
            </div>

            {/* Interactive Star Picker */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                {isKm ? 'ជ្រើសរើសចំនួនផ្កាយវាយតម្លៃ:' : 'Select Star Rating:'}
              </label>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const activeStar = hoverRating !== null ? hoverRating : rating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-hidden"
                      >
                        <Star
                          className={`w-6 h-6 cursor-pointer transition-colors ${
                            star <= activeStar
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20">
                  {ratingLabels[hoverRating || rating]?.[isKm ? 'km' : 'en']}
                </span>
              </div>
            </div>

            {/* Text review comment input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                {isKm ? 'មតិយោបល់របស់អ្នកជាអក្សរ:' : 'Your Review Comment:'}
              </label>

              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  isKm 
                    ? 'ចែករំលែកបទពិសោធន៍រៀនសូត្រ ចំណុចល្អៗ ឬការពេញចិត្តចំពោះវគ្គសិក្សានេះ...' 
                    : 'Share your learning experience, what you enjoyed about the course...'
                }
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 transition-all font-medium"
                required
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-1">
              {existingUserReview && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  {isKm ? 'បោះបង់' : 'Cancel'}
                </button>
              )}

              <button
                type="submit"
                disabled={!comment.trim()}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>
                  {existingUserReview
                    ? (isKm ? 'រក្សាទុកការកែប្រែ' : 'Update Review')
                    : (isKm ? 'ផ្ញើការវាយតម្លៃ' : 'Submit Review')}
                </span>
              </button>
            </div>
          </form>
        )}

      </div>

      {/* REVIEWS LIST & FILTER BAR */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
            <span>{isKm ? 'មតិយោបល់ទាំងអស់' : 'All Student Reviews'}</span>
            <span className="text-xs text-slate-500 font-normal">({filteredReviewsList.length})</span>
          </h4>

          {/* Filter Pill Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                filterRating === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isKm ? 'ទាំងអស់' : 'All'}
            </button>

            {[5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                onClick={() => setFilterRating(filterRating === s ? 'all' : s)}
                className={`px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 transition-all ${
                  filterRating === s
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{s}</span>
                <Star className="w-3 h-3 fill-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Cards List */}
        {filteredReviewsList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {isKm
                ? 'មិនទាន់មានការវាយតម្លៃតាមតម្រងនេះនៅឡើយទេ។'
                : 'No student reviews match the selected filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviewsList.map((rev) => {
              const isOwner = user?.id === rev.userId;
              const isHelpfulVoted = votedReviews[rev.id];
              const votesCount = (helpfulVotes[rev.id] || 0) + 2; // base offset for realism

              return (
                <div
                  key={rev.id}
                  className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-5 border border-slate-200/80 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                        alt={rev.userName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900">{rev.userName}</h5>
                          {rev.isVerifiedEnrolled && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>{isKm ? 'សិស្សផ្លូវការ' : 'Verified Student'}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">{rev.createdAt}</div>
                      </div>
                    </div>

                    {/* Rating stars */}
                    <div className="flex items-center gap-1 text-amber-400 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-100'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1">{rev.rating}.0</span>
                    </div>
                  </div>

                  {/* Comment text */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {rev.comment}
                  </p>

                  {/* Card footer bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <button
                      onClick={() => handleHelpfulClick(rev.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                        isHelpfulVoted
                          ? 'bg-blue-100 text-blue-700 font-bold'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>
                        {isKm ? 'មានប្រយោជន៍' : 'Helpful'} ({votesCount})
                      </span>
                    </button>

                    {isOwner && onDeleteReview && (
                      <button
                        onClick={() => onDeleteReview(rev.id)}
                        className="text-rose-500 hover:text-rose-700 text-xs font-medium flex items-center gap-1 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{isKm ? 'លុបការវាយតម្លៃ' : 'Delete'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
