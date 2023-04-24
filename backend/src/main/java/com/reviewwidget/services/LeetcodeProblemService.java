package com.reviewwidget.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reviewwidget.models.Item;
import com.reviewwidget.models.LeetcodeProblem;
import com.reviewwidget.repositories.LeetcodeProblemRepositoryImpl;

@Service
public class LeetcodeProblemService {

    @Autowired
    private LeetcodeProblemRepositoryImpl leetcodeRepository;

    public LeetcodeProblem createLeetcodeProblem(LeetcodeProblem problem) {
        return leetcodeRepository.insert(problem);
    }

    public List<LeetcodeProblem> findAll() {
        List<Item> items = leetcodeRepository.findAll(Item.Type.LEETCODE);
        List<LeetcodeProblem> problems = items.stream().map(item -> (LeetcodeProblem) item).collect(Collectors.toList());
        return problems;
    }

    public Optional<LeetcodeProblem> findById(String id) {
        UUID uid = UUID.fromString(id);
        return leetcodeRepository.findById(uid);
    }

    public void deleteById(String id) {
        UUID uid = UUID.fromString(id);
        leetcodeRepository.deleteById(uid);
    }

    public void save(LeetcodeProblem updatedProblem) {
        leetcodeRepository.save(updatedProblem);
    }

    public void deleteAll() {
        leetcodeRepository.deleteAll();
    }

}
